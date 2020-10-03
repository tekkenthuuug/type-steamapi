export interface SteamUserAchievement {
  apiname: string;
  name: string;
  description: string;
  achieved: number;
  unlocktime: number;
}

export interface SteamCategory {
  id: number;
  dscription: string;
}

export interface SteamGenre {
  id: number;
  dscription: string;
}

export interface SteamScreenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface SteamHightlightedAchievement {
  name: string;
  path: string;
}

export interface SteamAvatarObject {
  small: string;
  medium: string;
  large: string;
}

export interface SteamGameSchemaAchievement {
  name: string;
  displayName: string;
  description: string;
  defaultvalue: number;
  hidden: number;
  icon: string;
  icongray: string;
}

export interface SteamPlayerBadge {
  appid: string;
  badgeid: string;
  border_color: string;
  communityitemid: string;
  completion_time: number;
  level: string;
  scarcity: string;
  xp: number;
}

export interface SteamPlayerStat {
  name: string;
  value: number;
}

export interface SteamServer {
  addr: string;
  appid: string;
  gamedir: string;
  gmsindex: string;
  lan: string;
  gameport: string;
  region: string;
  secure: string;
  specport: string;
}

export interface SteamGameStat {
  name: string;
  defaultvalue: number;
  displayName: string;
}

export interface SteamGameAchievement {
  name: string;
  percent: number;
}

export interface SteamPackageSub {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

export interface SteamPackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: string;
  is_recurring_subscription: string;
  subs: SteamPackageSub[];
}

export interface SteamPlatformRequirement {
  minimum: string;
}

export interface SteamContentDescriptors {
  ids: number[];
  notes: string;
}

export interface SteamSupportInfo {
  coming_soon: boolean;
  date: string;
}

export interface SteamAppMetacritic {
  score: number;
  url: string;
}

export interface SteamAppPlatforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}
export interface SteamAppDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: string;
  is_free: boolean;
  controller_support: string;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  website: string;
  pc_requirements: SteamPlatformRequirement;
  mac_requirements: SteamPlatformRequirement;
  linux_requirements: SteamPlatformRequirement;
  developers: string[];
  publishers: string[];
  packages: number[];
  package_groups: SteamPackageGroup[];
  platforms: SteamAppPlatforms;
  metacritic: SteamAppMetacritic;
  categories: SteamCategory[];
  genres: SteamGenre[];
  screenshots: SteamScreenshot[];
  recommendations: { total: number };
  achievements: {
    total: number;
    hightlighted: SteamHightlightedAchievement[];
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: SteamSupportInfo;
  background: string;
  content_descriptors: SteamContentDescriptors;
}

export interface SteamAppNews {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
}

export interface SteamGameSchema {
  gameName: string;
  gameVersion: string;
  availableGameStats: {
    stats: SteamGameStat[];
    achievements: SteamGameSchemaAchievement[];
  };
}

export interface SteamServer {
  appid: string;
  actor: string;
  memo: string;
  login_token: string;
  is_deleted: string;
  is_expired: string;
  rt_last_logon: number;
}

export interface SteamPlayerAchievements {
  steamID: string;
  gameName: string;
  achievements: SteamUserAchievement[];
}

export interface SteamPlayerBadgesInfo {
  badges: SteamPlayerBadge[];
  player_xp: number;
  player_level: number;
  player_xp_needed_to_level_up: number;
  player_xp_needed_current_level: number;
}

export interface SteamPlayerBans {
  SteamId: string;
  CommunityBanned: boolean;
  VACBanned: boolean;
  DaysSinceLastBan: number;
  EconomyBan: string;
  NumberOfVACBans: number;
  NumberOfGameBans: number;
}

export interface SteamFriend {
  steamid: string;
  relationship: string;
  friend_since: number;
}

export interface SteamUserGroup {
  gid: string;
}

export interface SteamGame {
  name: string;
  appid: string;
  playtime_forever: number;
  playtime_2weeks: number;
  img_icon_url: string;
  img_logo_url: string;
}

export interface SteamPlayerStats {
  steamID: string;
  gameName: string;
  stats: SteamPlayerStat[];
  achievements: SteamUserAchievement[];
}

export type SteamCommunityVisibilityState = 1 | 3;

export const personaStateMap = {
  0: 'offline',
  1: 'online',
  2: 'busy',
  3: 'away',
  4: 'snooze',
  5: 'looking for trade',
  6: 'looking to play',
};

export type SteamPersonaStates = keyof typeof personaStateMap;

export interface SteamPlayerSummary {
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personaname: string;
  profileurl: string;
  personastate: SteamPersonaStates;
  communityvisibilitystate: SteamCommunityVisibilityState;
  profilestate: number;
  lastlogoff: number;
  commentpermission: string;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  gameid?: string;
  gameserverip?: string;
  gameextrainfo?: string;
  loccountycode?: string;
  locstatecode?: string;
  loccityid?: string;
}

export interface SteamFeaturedItem {
  id: number;
  type: number;
  name: string;
  discounted: boolean;
  discount_percent: number;
  original_price: number | null;
  final_price: number;
  currency: string;
  large_capsule_image: string;
  small_capsule_image: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  streamingvideo_available: boolean;
  header_image: string;
  controller_support: string;
}
