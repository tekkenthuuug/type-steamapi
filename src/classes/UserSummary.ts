import { Field, ObjectType } from 'type-graphql';
import { personaStateMap, SteamPlayerSummary } from '../types';

@ObjectType()
class Avatar {
  @Field(() => String)
  default: string;
  @Field(() => String)
  medium: string;
  @Field(() => String)
  full: string;
}

@ObjectType()
class UserSummary {
  @Field(() => Avatar)
  avatar: Avatar;
  @Field(() => String)
  personaName;
  @Field(() => String)
  profileUrl;
  /** Could be mapped with getPersonaState method */
  @Field(() => Number)
  personaState;
  @Field(() => Number)
  communityVisibilityState;
  @Field(() => Number)
  profileState;
  @Field(() => Number)
  lastLogoff;
  @Field(() => String, { nullable: true })
  commentPermission;
  @Field(() => String, { nullable: true })
  realName;
  @Field(() => String, { nullable: true })
  primaryClanId;
  @Field(() => Number, { nullable: true })
  timeCreated;
  @Field(() => String, { nullable: true })
  gameId;
  @Field(() => String, { nullable: true })
  gameServerIp;
  @Field(() => String, { nullable: true })
  gameExtraInfo;
  @Field(() => String, { nullable: true })
  locCountyCode;
  @Field(() => String, { nullable: true })
  locStateCode;
  @Field(() => String, { nullable: true })
  locCityId;

  constructor(playerSummary: SteamPlayerSummary) {
    this.avatar = {
      default: playerSummary.avatar,
      medium: playerSummary.avatarmedium,
      full: playerSummary.avatarfull,
    };
    this.commentPermission = playerSummary.commentpermission;
    this.communityVisibilityState = playerSummary.communityvisibilitystate;
    this.gameExtraInfo = playerSummary.gameextrainfo;
    this.gameId = playerSummary.gameid;
    this.gameServerIp = playerSummary.gameserverip;
    this.timeCreated = playerSummary.timecreated;
    this.realName = playerSummary.realname;
    this.profileUrl = playerSummary.profileurl;
    this.profileState = playerSummary.profilestate;
    this.primaryClanId = playerSummary.primaryclanid;
    this.personaState = playerSummary.personastate;
    this.personaName = playerSummary.personaname;
    this.locStateCode = playerSummary.locstatecode;
    this.locCountyCode = playerSummary.loccountycode;
    this.locCityId = playerSummary.loccityid;
    this.lastLogoff = playerSummary.lastlogoff;
  }

  getPersonaState(): string | undefined {
    return personaStateMap[this.personaState];
  }
}

export default UserSummary;
