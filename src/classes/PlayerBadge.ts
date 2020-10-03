import { SteamPlayerBadge } from 'src/types';

class PlayerBadge {
  appId;
  badgeId;
  borderColor;
  communityItemId;
  completionTime;
  level;
  scarcity;
  xp;

  constructor(badge: SteamPlayerBadge) {
    this.appId = badge.appid;
    this.badgeId = badge.badgeid;
    this.borderColor = badge.border_color;
    this.communityItemId = badge.communityitemid;
    this.completionTime = badge.completion_time;
    this.level = badge.level;
    this.scarcity = badge.scarcity;
    this.xp = badge.xp;
  }
}

export default PlayerBadge;
