import { SteamFriend } from 'src/types';
import User from './User';

class Friend extends User {
  relationship;
  friendSince;

  constructor(friend: SteamFriend) {
    super(friend.steamid);
    this.relationship = friend.relationship;
    this.friendSince = friend.friend_since;
  }
}

export default Friend;
