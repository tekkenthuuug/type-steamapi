import User from './User';
import { SteamUserStats } from '../types/steamEntities';

class UserStats extends User {
  gameName;
  stats;
  achievements: {
    achieved: boolean;
    apiName: string;
  }[];

  constructor(userStats: SteamUserStats) {
    super(userStats.steamID);
    this.gameName = userStats.gameName;
    this.stats = userStats.stats;
    this.achievements = userStats.achievements.map(achievement => ({
      achieved: !!achievement.achieved,
      apiName: achievement.name,
    }));
  }
}

export default UserStats;
