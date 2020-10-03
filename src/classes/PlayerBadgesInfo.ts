import { SteamPlayerBadgesInfo } from 'src/types';
import PlayerBadge from './PlayerBadge';

class PlayerBadgesInfo {
  badges: PlayerBadge[];
  playerXp;
  playerLevel;
  playerXpNeededToLevelUp;
  playerXpNeededCurrentLevel;

  constructor(playerBadgesInfo: SteamPlayerBadgesInfo) {
    this.badges = playerBadgesInfo.badges.map(badge => new PlayerBadge(badge));
    this.playerXp = playerBadgesInfo.player_xp;
    this.playerLevel = playerBadgesInfo.player_level;
    this.playerXpNeededToLevelUp =
      playerBadgesInfo.player_xp_needed_to_level_up;
    this.playerXpNeededCurrentLevel =
      playerBadgesInfo.player_xp_needed_current_level;
  }
}

export default PlayerBadgesInfo;
