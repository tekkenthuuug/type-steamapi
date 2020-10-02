export * from './steamEntities';
export * from './steamResponses';

import { SteamAppDetails } from './steamEntities';

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
  gameDetails: SteamAppDetails
];

export type AvailableRegions =
  | 'us'
  | 'es'
  | 'de'
  | 'fr'
  | 'ru'
  | 'nz'
  | 'au'
  | 'uk';
