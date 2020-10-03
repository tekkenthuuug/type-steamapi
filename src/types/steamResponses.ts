import {
  SteamFriend,
  SteamGame,
  SteamGameAchievement,
  SteamAppDetails,
  SteamGameNews,
  SteamGameSchema,
  SteamPlayerAchievements,
  SteamPlayerBadges,
  SteamPlayerBans,
  SteamPlayerStats,
  SteamPlayerSummary,
  SteamServer,
  SteamUserGroup,
} from './steamEntities';

export interface SteamMessage {
  success: number;
  message?: string;
}

export interface GetGlobalAchievementPercentagesForAppResponse {
  achievements: SteamGameAchievement[];
}

export type AppDetailsResponse = {
  data: SteamAppDetails;
} & SteamMessage;

export interface GetNewsForAppResponse {
  appid: number;
  count: number;
  newsitems: SteamGameNews[];
}

export type GetNumberOfCurrentPlayersResponse = {
  result: number;
  player_count: number;
};

export interface GetSchemaForGameResponse {
  game: SteamGameSchema;
}

export type GetServersAtAddressResponse = {
  servers: SteamServer[];
} & SteamMessage;

export type GetPlayerAchievementsResponse = SteamPlayerAchievements &
  SteamMessage;

export type GetBadgesResponse = SteamPlayerBadges;

export interface GetPlayerBansResponse {
  players: SteamPlayerBans[];
}

export interface GetFriendListResponse {
  friends: SteamFriend[];
}

export type GetUserGroupListResponse = {
  groups: SteamUserGroup[];
} & SteamMessage;

export type GetSteamLevelResponse = {
  player_level: number;
};

export type GetOwnedGamesResponse = {
  game_count: number;
  games: SteamGame[];
};

export type GetRecentlyPlayedGames = {
  total_count: number;
  games: SteamGame[];
};

export type GetUserStatsForGameResponse = SteamPlayerStats;

export interface GetPlayerSummariesResponse {
  players: SteamPlayerSummary[];
}

export type ResolveVanityURLResponse = {
  steamid: string;
} & SteamMessage;
