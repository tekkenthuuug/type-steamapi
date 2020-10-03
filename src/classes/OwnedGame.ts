import { SteamGame } from 'src/types';
import { imageCDN } from '../utils/constants';

class OwnedGame {
  name;
  appId;
  playtimeTotal;
  playtime2weeks;
  imgIconUrl;
  imgLogoUrl;

  constructor(ownedGame: SteamGame) {
    this.name = ownedGame.name;
    this.appId = ownedGame.appid;
    this.playtimeTotal = ownedGame.playtime_forever;
    this.playtime2weeks = ownedGame.playtime_2weeks || 0;
    this.imgIconUrl = `${imageCDN}/${this.appId}/${ownedGame.img_icon_url}.jpg`;
    this.imgLogoUrl = `${imageCDN}/${this.appId}/${ownedGame.img_logo_url}.jpg`;
  }
}

export default OwnedGame;
