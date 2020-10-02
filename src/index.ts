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
} from './types';
import Cache from './utils/Cache';
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
    'Content-Type': 'Application/json',
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
    if (!appRegex.test(app)) throw TypeError('Invalid/no app provided');

    // key for cache map
    const cacheKey = this.appDetailsCache!.createCacheKey(app, { region });

    if (this.cacheConfig.enabled && !force) {
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

    if (this.cacheConfig.enabled) {
      this.appDetailsCache!.add(cacheKey, data);
    }

    return success ? data : null;
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
})();

export default SteamAPI;
