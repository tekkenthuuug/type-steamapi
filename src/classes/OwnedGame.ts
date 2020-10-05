import { SteamGame } from 'src/types';
import { Field, ObjectType } from 'type-graphql';
import { imageCDN } from '../utils/constants';

@ObjectType()
class OwnedGame {
  @Field(() => String)
  name;
  @Field(() => String)
  appId;
  @Field(() => Number)
  playtimeTotal;
  @Field(() => Number)
  playtime2weeks;
  @Field(() => String)
  imgIconUrl;
  @Field(() => String)
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
