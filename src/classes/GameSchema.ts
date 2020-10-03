import { SteamGameSchema, SteamGameStat } from 'src/types';
import GameSchemaAchievement from './GameSchemaAchievement';

class GameSchema {
  gameName;
  gameVersion;
  availableGameStats: {
    stats: SteamGameStat[];
    achievements: GameSchemaAchievement[];
  };

  constructor(gameSchema: SteamGameSchema) {
    this.gameName = gameSchema.gameName;
    this.gameVersion = gameSchema.gameVersion;
    this.availableGameStats = {
      stats: gameSchema.availableGameStats.stats,
      achievements: gameSchema.availableGameStats.achievements.map(
        a => new GameSchemaAchievement(a)
      ),
    };
  }
}

export default GameSchema;
