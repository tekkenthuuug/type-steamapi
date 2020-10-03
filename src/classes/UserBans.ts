import { SteamUserBans } from 'src/types';

class UserBans {
  steamId;
  communityBanned;
  vacBanned;
  daysSinceLastBan;
  economyBan;
  numberOfVACBans;
  numberOfGameBans;

  constructor(userBans: SteamUserBans) {
    this.steamId = userBans.SteamId;
    this.communityBanned = userBans.CommunityBanned;
    this.vacBanned = userBans.VACBanned;
    this.daysSinceLastBan = userBans.DaysSinceLastBan;
    this.economyBan = userBans.EconomyBan;
    this.numberOfVACBans = userBans.NumberOfVACBans;
    this.numberOfGameBans = userBans.NumberOfGameBans;
  }
}

export default UserBans;
