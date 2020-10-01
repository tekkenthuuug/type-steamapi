import {
  SteamFriend,
  SteamGame,
  SteamGameAchievement,
  SteamGameDetails,
  SteamGameNews,
  SteamGameSchema,
  SteamPlayerAchievements,
  SteamPlayerBadges,
  SteamPlayerBans,
  SteamPlayerServers,
  SteamPlayerStats,
  SteamPlayerSummary,
  SteamServer,
  SteamUserGroup,
} from './steamEntities';

export interface SteamResponse<T> {
  response: T;
}

export interface SteamMessage {
  success: number;
  message?: string;
}

export interface SteamResponseWithMessage<T> {
  response: T & SteamMessage;
}

export interface GetGlobalAchievementPercentagesForAppResponse {
  achievements: SteamGameAchievement[];
}

export type AppDetailsResponse = Record<
  string,
  {
    data: SteamGameDetails;
  } & SteamMessage
>;

export interface GetNewsForAppResponse {
  appnews: {
    appid: number;
    count: number;
    newsitems: SteamGameNews[];
  };
}

export type GetNumberOfCurrentPlayersResponse = SteamResponse<{
  result: number;
  player_count: number;
}>;

export interface GetSchemaForGameResponse {
  game: SteamGameSchema;
}

export type GetServersAtAddressResponse = SteamResponseWithMessage<{
  servers: SteamServer[];
}>;

export interface GetPlayerAchievementsResponse {
  playerstats: SteamPlayerAchievements & SteamMessage;
}

export type GetBadgesResponse = SteamResponse<SteamPlayerBadges>;

export interface GetPlayerBansResponse {
  players: SteamPlayerBans[];
}

export interface GetFriendListResponse {
  friendslist: {
    friends: SteamFriend[];
  };
}

export type GetUserGroupListResponse = SteamResponseWithMessage<{
  groups: SteamUserGroup[];
}>;

export type GetSteamLevelResponse = SteamResponse<{
  player_level: number;
}>;

export type GetOwnedGamesResponse = SteamResponse<{
  game_count: number;
  games: SteamGame[];
}>;

export type GetRecentlyPlayedGames = SteamResponse<{
  total_count: number;
  games: SteamGame[];
}>;

export type ServersGetAccountList = SteamResponse<SteamPlayerServers>;

export interface GetUserStatsForGameResponse {
  playerstats: SteamPlayerStats;
}

export type GetPlayerSummariesResponse = SteamResponse<{
  players: SteamPlayerSummary[];
}>;

export type ResolveVanityURLResponse = {
  steamid: string;
} & SteamMessage;
