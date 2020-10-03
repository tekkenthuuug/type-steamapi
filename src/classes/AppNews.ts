import { SteamAppNews } from '../types/steamEntities';

class AppNews {
  gid;
  title;
  url;
  isExternalUrl;
  author;
  contents;
  feedLabel;
  createdAt;
  feedName;
  feedType;
  appid;

  constructor(news: SteamAppNews) {
    this.gid = news.gid;
    this.title = news.title;
    this.url = news.url;
    this.isExternalUrl = news.is_external_url;
    this.author = news.author;
    this.contents = news.contents;
    this.feedType = news.feed_type;
    this.feedLabel = news.feedlabel;
    this.createdAt = news.date;
    this.feedName = news.feedname;
    this.appid = news.appid;
  }
}

export default AppNews;
