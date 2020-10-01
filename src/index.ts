import fetch from 'node-fetch';
export * from './classes';
export * from './types';
import apiKey from './config';

import {
  SteamCacheConfig,
  SteamAPIConstructor,
  ResolveVanityURLResponse,
  GetGlobalAchievementPercentagesForAppResponse,
} from './types';
import Cache from './utils/Cache';
import simplifyObject from './utils/simplifyObject';

const appRegex = /^\d{1,7}$/;
const profileBaseRegex = String.raw`(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;
const profileUrlRegex = RegExp(
  String.raw`${profileBaseRegex}(?:profiles\/)?(\d{17})`,
  'i'
);
const profileIdRegex = RegExp(
  String.raw`${profileBaseRegex}(?:id\/)?([a-z0-9_-]{2,32})`,
  'i'
);

class SteamAPI {
  apiKey;
  cacheConfig: SteamCacheConfig;
  resolveCache: Cache<string> | undefined;
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
    // This will remove unnecessary when possible

    return simplifyObject<T>(data);
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
}

const steam = new SteamAPI({ apiKey });

(async () => {
  const steamid = await steam.resolve('id/DimGG/');
  console.log(steamid);

  // const featuredCategories = await steam.getFeaturedCategories();
  // console.log(featuredCategories);

  // const featuredGames = await steam.getFeaturedGames();
  // console.log(featuredGames);

  // const gameAchievements = await steam.getGameAchievements('730');
  // console.log(gameAchievements);
})();

export default SteamAPI;
