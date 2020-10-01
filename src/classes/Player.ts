class Player {
  steamID;

  constructor(steamID: string) {
    this.steamID = steamID;
  }

  get profileURL() {
    return `https://steamcommunity.com/profiles/${this.steamID}`;
  }
}

export default Player;
