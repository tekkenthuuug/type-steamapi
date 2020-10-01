export * from './classes';
export * from './types';

import { SteamCacheConfig, SteamAPIConstructor } from './types';
import Cache from './utils/Cache';

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

    const [firstPropertyName, ...restProperties] = Object.values(data);

    return (restProperties.length === 0 ? data[firstPropertyName] : data) as T;
  }
}

new SteamAPI({ apiKey: 'adad' });

export default SteamAPI;
