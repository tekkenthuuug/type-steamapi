export interface SteamAchievement {
  apiname: string;
  name: string;
  description: string;
  achieved: string;
  unlockTime: number;
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

export interface SteamGameSchemaAchievement extends SteamAchievement {
  defaultvalue: number;
  hidden: number;
  icon: string;
  icongray: string;
}

export interface SteamBadge {
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

export interface GameStat {
  name: string;
  defaultvalue: number;
  displayName: string;
}

export interface SteamGameAchievement {
  name: string;
  percent: number;
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
  pc_requirements: {
    minimum: string;
  };
  mac_requirements: {
    minimum: string;
  };
  linux_requirements: {
    minimum: string;
  };
  developers: string[];
  publishers: string[];
  packages: number;
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  metacritic: {
    score: number;
    url: string;
  };
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
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  content_descriptors: {
    ids: number[];
    notes: string;
  };
}

export interface SteamGameNews {
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
    stats: GameStat[];
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
  achievements: SteamAchievement[];
}

export interface SteamPlayerBadges {
  badges: SteamBadge[];
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
  achievements: SteamAchievement[];
}

export interface SteamPlayerSummary {
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  steamid: string;
  profileurl: string;
  timecreated: number;
  lastlogoff: number;
  personaname: string;
  realname: string;
  primaryclanid: string;
  personastate: number;
  personastateflags: string;
  commentpermission: string;
  communityvisibilitystate: string;
  loccountrycode: string;
  locstatecode: string;
  loccityid: string;
  gameserverip: string;
  gameserversteamid: string;
  gameextrainfo: string;
  gameid: string;
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
