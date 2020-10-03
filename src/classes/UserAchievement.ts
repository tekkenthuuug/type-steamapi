import { SteamUserAchievement } from 'src/types';
import Achievement from './Achievement';

class UserAchievement extends Achievement {
  achieved;
  unlockTime;

  constructor(achivement: SteamUserAchievement) {
    super({
      apiName: achivement.apiname,
      name: achivement.name,
      description: achivement.description,
    });
    this.achieved = !!achivement.achieved;
    this.unlockTime = achivement.unlocktime;
  }
}

export default UserAchievement;
