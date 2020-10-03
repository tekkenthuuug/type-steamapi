import { SteamFriend } from 'src/types';
import Player from './Player';

class Friend extends Player {
  relationship;
  friendSince;

  constructor(friend: SteamFriend) {
    super(friend.steamid);
    this.relationship = friend.relationship;
    this.friendSince = friend.friend_since;
  }
}

export default Friend;
