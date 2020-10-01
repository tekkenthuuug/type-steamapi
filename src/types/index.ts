export * from './steamEntities';
export * from './steamResponses';

import { SteamGameDetails } from './steamEntities';

export interface SteamCacheConfig {
  enabled: boolean;
  expiresIn: number;
}

export interface SteamAPIConstructor {
  apiKey: string;
  cache?: SteamCacheConfig;
}

export type GameDetailsCacheValue = [
  timestamp: number,
  gameDetails: SteamGameDetails
];
