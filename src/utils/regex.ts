const profileBaseRegex = String.raw`(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;

export const appRegex = /^\d{1,7}$/;

export const profileUrlRegex = RegExp(
  String.raw`${profileBaseRegex}(?:profiles\/)?(\d{17})`,
  'i'
);
export const profileIdRegex = RegExp(
  String.raw`${profileBaseRegex}(?:id\/)?([a-z0-9_-]{2,32})`,
  'i'
);
