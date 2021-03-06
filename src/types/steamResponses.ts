import {
  SteamFriend,
  SteamGame,
  SteamGameAchievement,
  SteamAppDetails,
  SteamAppNews,
  SteamGameSchema,
  SteamPlayerAchievements,
  SteamPlayerBadgesInfo,
  SteamUserBans,
  SteamUserStats,
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
  newsitems: SteamAppNews[];
}

export type GetNumberOfCurrentPlayersResponse = {
  result: number;
  player_count: number;
};

export type GetSchemaForGameResponse = SteamGameSchema;

export type GetServersAtAddressResponse = {
  servers: SteamServer[];
} & SteamMessage;

export type GetPlayerAchievementsResponse = SteamPlayerAchievements &
  SteamMessage;

export type GetBadgesResponse = SteamPlayerBadgesInfo;

export interface GetPlayerBansResponse {
  players: SteamUserBans[];
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

export type GetUserStatsForGameResponse = SteamUserStats;

export interface GetPlayerSummariesResponse {
  players: SteamPlayerSummary[];
}

export type ResolveVanityURLResponse = {
  steamid: string;
} & SteamMessage;
