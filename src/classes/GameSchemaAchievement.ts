import { SteamGameSchemaAchievement } from 'src/types';
import Achievement from './Achievement';

class GameSchemaAchievement extends Achievement {
  defaultValue;
  hidden;
  icon;
  iconGray;

  constructor(gameSchemaAchievement: SteamGameSchemaAchievement) {
    super({
      apiName: gameSchemaAchievement.name,
      name: gameSchemaAchievement.displayName,
      description: gameSchemaAchievement.description,
    });

    this.defaultValue = gameSchemaAchievement.defaultvalue;
    this.hidden = !!gameSchemaAchievement.hidden;
    this.icon = gameSchemaAchievement.icon;
    this.iconGray = gameSchemaAchievement.icongray;
  }
}

export default GameSchemaAchievement;
