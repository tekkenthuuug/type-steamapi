import { SteamScreenshot } from 'src/types';

class Screenshot {
  id;
  pathThumbnail;
  pathFull;

  constructor(screenshot: SteamScreenshot) {
    this.id = screenshot.id;
    this.pathFull = screenshot.path_full;
    this.pathThumbnail = screenshot.path_thumbnail;
  }
}

export default Screenshot;
