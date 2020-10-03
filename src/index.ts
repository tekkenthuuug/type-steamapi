import fetch from 'node-fetch';
export * from './classes';
export * from './types';
import apiKey from './config';

import {
  SteamCacheConfig,
  SteamAPIConstructor,
  ResolveVanityURLResponse,
  GetGlobalAchievementPercentagesForAppResponse,
  AvailableRegions,
  SteamAppDetails,
  AppDetailsResponse,
  GetNewsForAppResponse,
  GetNumberOfCurrentPlayersResponse,
  GetSchemaForGameResponse,
  GetServersAtAddressResponse,
  GetPlayerAchievementsResponse,
  GetBadgesResponse,
  GetPlayerBansResponse,
  GetFriendListResponse,
  GetUserGroupListResponse,
  GetSteamLevelResponse,
  GetOwnedGamesResponse,
  GetRecentlyPlayedGames,
  GetUserStatsForGameResponse,
  GetPlayerSummariesResponse,
} from './types';
import Cache from './utils/Cache';
import { availableRegions } from './utils/constants';
import { appRegex, profileIdRegex, profileUrlRegex } from './utils/regex';
import simplifyObject from './utils/simplifyObject';

class SteamAPI {
  apiKey;
  cacheConfig: SteamCacheConfig;
  resolveCache: Cache<string> | undefined;
  appDetailsCache: Cache<SteamAppDetails> | undefined;
  baseAPI = 'https://api.steampowered.com';
  baseStore = 'https://store.steampowered.com/api';
  headers = {
    'User-Agent':
      'Type-SteamAPI/0.8.5: (https://www.npmjs.com/package/type-steamapi)',
    'Content-Type': 'application/json',
  };

  constructor({
    apiKey,
    cache = {
      enabled: true,
      expiresIn: 1000 * 60 * 5, // 5 min
    },
  }: SteamAPIConstructor) {
    this.apiKey = apiKey;
    this.cacheConfig = cache;

    if (cache.enabled) {
      this.resolveCache = new Cache<string>(cache.expiresIn);
      this.appDetailsCache = new Cache<SteamAppDetails>(cache.expiresIn);
    }
  }

  async fetch<T = any>(
    path: string,
    base = this.baseAPI,
    apiKey = this.apiKey
  ) {
    const response = await fetch(
      `${base}${path}${path.includes('?') ? '&' : '?'}key=${apiKey}`,
      {
        headers: this.headers,
      }
    );

    const data = await response.json();

    // Steam API in some requests returns a single top-level property
    // This will remove unnecessary nesting when possible

    return simplifyObject(data) as T;
  }

  async resolve(info: string) {
    if (!info) throw TypeError('No link provided');

    const urlMatch = info.match(profileUrlRegex);
    if (urlMatch !== null) {
      return urlMatch[1];
    }

    const idMatch = info.match(profileIdRegex);
    if (!idMatch) {
      throw TypeError('Invalid format');
    }

    const id = idMatch[1];
    const cachedSteamId = this.resolveCache?.getRelevant(id);

    if (cachedSteamId) {
      return cachedSteamId;
    }

    const { success, message, steamid } = await this.fetch<
      ResolveVanityURLResponse
    >(`/ISteamUser/ResolveVanityURL/v1?vanityurl=${id}`);

    if (!success) {
      throw Error(message);
    }

    this.resolveCache?.add(id, steamid);
    return steamid;
  }

  async getFeaturedCategories() {
    //@TODO
    const data = await this.fetch('/featuredcategories', this.baseStore);

    return data;
  }

  async getFeaturedGames() {
    //@TODO
    const data = await this.fetch('/featuredcategories', this.baseStore);

    return data;
  }

  async getGameAchievements(app: string) {
    if (!appRegex.test(app)) {
      throw TypeError('Invalid app provided');
    }

    const { achievements } = await this.fetch<
      GetGlobalAchievementPercentagesForAppResponse
    >(
      `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2?gameid=${app}`
    );

    return achievements;
  }

  async getGameDetails(
    app: string,
    force = false,
    region: AvailableRegions = 'us'
  ) {
    if (!appRegex.test(app)) {
      throw TypeError('Invalid/no app provided');
    }

    if (!availableRegions.includes(region)) {
      throw TypeError(`This region is not available (${region})`);
    }

    // key for cache map
    const cacheKey = this.appDetailsCache?.createCacheKey(app, { region });

    if (this.cacheConfig.enabled && cacheKey && !force) {
      // appDetails from cache
      const fromCache = this.appDetailsCache!.getRelevant(cacheKey);

      if (fromCache) {
        return fromCache;
      }
    }

    const { success, data } = await this.fetch<AppDetailsResponse>(
      `/appdetails?appids=${app}&cc=${region}`,
      this.baseStore
    );

    if (this.cacheConfig.enabled && cacheKey) {
      this.appDetailsCache!.add(cacheKey, data);
    }

    return success ? data : null;
  }

  async getGameNews(app: string) {
    if (!appRegex.test(app)) throw TypeError('Invalid/no app provided');

    const data = await this.fetch<GetNewsForAppResponse>(
      `/ISteamNews/GetNewsForApp/v2?appid=${app}`
    );

    return data.count ? data : null;
  }

  async getGamePlayers(app: string) {
    if (!appRegex.test(app)) throw TypeError('Invalid/no app provided');

    const { player_count, result } = await this.fetch<
      GetNumberOfCurrentPlayersResponse
    >(`/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${app}`);

    return result === 1 ? player_count : null;
  }

  async getGameSchema(app: string) {
    if (!appRegex.test(app)) throw TypeError('Invalid/no app provided');

    const data = await this.fetch<GetSchemaForGameResponse>(
      `/ISteamUserStats/GetSchemaForGame/v2?appid=${app}`
    );

    return data ? data : null;
  }

  async getServers(address: string) {
    if (!address) {
      throw TypeError('No host provided');
    }

    const { success, servers } = await this.fetch<GetServersAtAddressResponse>(
      `/ISteamApps/GetServersAtAddress/v1?addr=${address}`
    );

    return success ? servers : null;
  }

  async getUserAchievements(id: string, app: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }
    if (!appRegex.test(app)) {
      throw TypeError('Invalid/no appid provided');
    }

    const { success, message, ...playerAchievements } = await this.fetch<
      GetPlayerAchievementsResponse
    >(
      `/ISteamUserStats/GetPlayerAchievements/v1?steamid=${id}&appid=${app}&l=english`
    );

    if (success) {
      return playerAchievements;
    } else {
      throw Error(message);
    }
  }

  async getUserBadges(id: string) {
    if (!profileIdRegex.test(id)) throw TypeError('Invalid/no id provided');

    const data = await this.fetch<GetBadgesResponse>(
      `/IPlayerService/GetBadges/v1?steamid=${id}`
    );

    return data;
  }

  async getUserBans(id: string | string[]) {
    if (
      (Array.isArray(id) && id.some(i => !profileIdRegex.test(i))) ||
      (!Array.isArray(id) && !profileIdRegex.test(id))
    ) {
      throw TypeError('Invalid/no id provided');
    }

    const { players } = await this.fetch<GetPlayerBansResponse>(
      `/ISteamUser/GetPlayerBans/v1?steamids=${id}`
    );

    if (!players.length) {
      return null;
    }

    return players;
  }

  async getUserFriends(id: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }

    const { friends } = await this.fetch<GetFriendListResponse>(
      `/ISteamUser/GetFriendList/v1?steamid=${id}`
    );

    return friends.length ? friends : null;
  }

  async getUserGroups(id: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }

    const { groups, success, message } = await this.fetch<
      GetUserGroupListResponse
    >(`/ISteamUser/GetUserGroupList/v1?steamid=${id}`);

    if (!success) {
      throw Error(message);
    }

    return groups.length ? groups : null;
  }

  async getUserLevel(id: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }

    const { player_level } = await this.fetch<GetSteamLevelResponse>(
      `/IPlayerService/GetSteamLevel/v1?steamid=${id}`
    );

    return player_level;
  }

  async getUserOwnedGames(id: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }

    const { games } = await this.fetch<GetOwnedGamesResponse>(
      `/IPlayerService/GetOwnedGames/v1?steamid=${id}&include_appinfo=1`
    );

    return games.length ? games : null;
  }

  async getUserRecentPlayed(id: string) {
    if (!profileUrlRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }

    const { games } = await this.fetch<GetRecentlyPlayedGames>(
      `/IPlayerService/GetRecentlyPlayedGames/v1?steamid=${id}`
    );

    return games.length ? games : null;
  }

  async getUserStats(id: string, app: string) {
    if (!profileIdRegex.test(id)) {
      throw TypeError('Invalid/no id provided');
    }
    if (!appRegex.test(app)) {
      throw TypeError('Invalid/no app provided');
    }

    const data = await this.fetch<GetUserStatsForGameResponse>(
      `/ISteamUserStats/GetUserStatsForGame/v2?steamid=${id}&appid=${app}`
    );

    if (!data) {
      throw Error('No player found');
    }

    return data;
  }

  async getUserSummary(id: string | string[]) {
    if (
      (Array.isArray(id) && id.some(i => !profileIdRegex.test(i))) ||
      (!Array.isArray(id) && !profileIdRegex.test(id))
    ) {
      throw TypeError('Invalid/no id provided');
    }

    const { players } = await this.fetch<GetPlayerSummariesResponse>(
      `/ISteamUser/GetPlayerSummaries/v2?steamids=${id}`
    );

    if (!players.length) {
      return null;
    }

    return players;
  }
}

const steam = new SteamAPI({ apiKey });

(async () => {
  const steamid = await steam.resolve('id/tekkenthuuug/');
  console.log(steamid);

  // const featuredCategories = await steam.getFeaturedCategories();
  // console.log(featuredCategories);

  // const featuredGames = await steam.getFeaturedGames();
  // console.log(featuredGames);

  // const gameAchievements = await steam.getGameAchievements('730');
  // console.log(gameAchievements);

  // const gameDetails = await steam.getGameDetails('730');
  // console.log('Game details', gameDetails)

  // const gameNews = await steam.getGameNews('730');
  // console.log('Game news', gameNews);

  // const gamePlayers = await steam.getGamePlayers('730');
  // console.log(gamePlayers);

  // const gameSchema = await steam.getGameSchema('730');
  // console.log(gameSchema);

  // const servers = await steam.getServers('216.52.148.47');
  // console.log(servers);

  // const userAchievements = await steam.getUserAchievements(steamid, '730');
  // console.log(userAchievements);

  // const userBadges = await steam.getUserBadges(steamid);
  // console.log(userBadges);

  // const userBans = await steam.getUserBans(steamid);
  // console.log(userBans);

  // const userFriends = await steam.getUserFriends(steamid);
  // console.log(userFriends);

  // const userGroups = await steam.getUserGroups(steamid);
  // console.log(userGroups);

  // const userLevel = await steam.getUserLevel(steamid);
  // console.log(userLevel);

  // const userOwnedGames = await steam.getUserOwnedGames(steamid);
  // console.log(userOwnedGames);

  // const userRecentGames = await steam.getUserRecentPlayed(steamid);
  // console.log(userRecentGames);

  // const userStats = await steam.getUserStats(steamid, '730');
  // console.log(userStats);

  // const userSummaries = await steam.getUserSummary(steamid);
  // console.log(userSummaries);
})();

export default SteamAPI;
