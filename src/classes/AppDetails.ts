import { SteamAppDetails } from 'src/types';
import PackageGroup from './PackageGroup';
import Screenshot from './Screenshot';

class AppDetails {
  type;
  name;
  steamAppId;
  requiredAge;
  isFree;
  controllerSupport;
  detailedDescription;
  aboutTheGame;
  shortDescription;
  supportedLanguages;
  headerImage;
  website;
  pcRequirements;
  macRequirements;
  linuxRequirements;
  developers;
  publishers;
  packages;
  packageGroups: PackageGroup[];
  platforms;
  metacritic;
  categories;
  genres;
  screenshots: Screenshot[];
  numberOfRecommendations;
  achievements;
  releaseDate: {
    comingSoon: boolean;
    date: string;
    released: boolean;
  };
  supportInfo;
  background;
  contentDescriptors;

  constructor(appDetails: SteamAppDetails) {
    this.type = appDetails.type;
    this.name = appDetails.name;
    this.steamAppId = appDetails.steam_appid;
    this.requiredAge = appDetails.required_age;
    this.isFree = appDetails.is_free;
    this.controllerSupport = appDetails.controller_support;
    this.detailedDescription = appDetails.detailed_description;
    this.aboutTheGame = appDetails.about_the_game;
    this.shortDescription = appDetails.short_description;
    this.supportedLanguages = appDetails.supported_languages;
    this.headerImage = appDetails.header_image;
    this.website = appDetails.website;
    this.pcRequirements = appDetails.pc_requirements;
    this.macRequirements = appDetails.mac_requirements;
    this.linuxRequirements = appDetails.linux_requirements;
    this.developers = appDetails.developers;
    this.publishers = appDetails.publishers;
    this.packages = appDetails.packages;
    this.packageGroups = appDetails.package_groups.map(
      packageGroup => new PackageGroup(packageGroup)
    );
    this.platforms = appDetails.platforms;
    this.metacritic = appDetails.metacritic;
    this.categories = appDetails.categories;
    this.genres = appDetails.genres;
    this.screenshots = appDetails.screenshots.map(
      screenshot => new Screenshot(screenshot)
    );
    this.numberOfRecommendations = appDetails.recommendations.total;
    this.achievements = appDetails.achievements;
    this.releaseDate = {
      comingSoon: appDetails.release_date.coming_soon,
      date: appDetails.release_date.date,
      released: new Date(appDetails.release_date.date).getTime() < Date.now(),
    };
    this.supportInfo = appDetails.support_info;
    this.background = appDetails.background;
    this.contentDescriptors = appDetails.content_descriptors;
  }
}

export default AppDetails;
