# Typescript Steam API

![GitHub](https://img.shields.io/github/license/tekkenthuuug/type-steamapi?style=for-the-badge)
![npm](https://img.shields.io/npm/v/type-steamapi?style=for-the-badge)

# Installation

```
npm install type-steamapi
```

or if you are using yarn

```
yarn add type-steamapi
```

#### Typescript

If you are using typescript, you don't need to install any type definitions, since this package is created with typescript

# Usage

### API key

Once installed, **you would need to get Steam API key** from [Steam Developer Platform](http://steamcommunity.com/dev/apikey)

### Creating an instance

After receiving an API key, you would need to **create an instance of SteamAPI class**, imported as a default from package.

**_WARNING_**: _You should never pass your API key directly as a string! Use [environmental variables](https://www.npmjs.com/package/dotenv) instead!_

```
import SteamAPI from 'type-steamapi';

const steam = new SteamAPI({
    apiKey: 'YOUR_API_KEY',
    cache: {
      enabled:  true,
      expiresIn:  1000  *  60  *  5  // 5 min
    }
});
```

**By default cache is enabled** and expires in 5 minutes. However, if you want to overwrite this behaviour, you can add cache property to configuration object.

### Examples

Now you can call methods on SteamAPI instance. Lets try a few things.

#### Fetching user ID

```
const steamid = await steam.resolve('https://steamcommunity.com/id/tekkenthuuug/');

console.log(steamid);

// Output: 76561198129961822
```

#### Fetching user owned games

```
const  userOwnedGames  =  await steam.getUserOwnedGames(steamid);

console.log(userOwnedGames);

// Output:
// [OwnedGame {
//    name: 'Broken Dreams',
//    appId: 444480,
//    playtimeTotal: 222,
//    playtime2weeks: 0,
//    imgIconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/444480/ab25220f8ae0432881195c8532776e634922bb7f.jpg',
//    imgLogoUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/444480/fa699b3f546806db99c4f8f9b5078224ca606893.jpg'
// }, ...]
```

### Caching

When enabling cache, **responses for getAppDetails and resolve methods would be cached**. If there would be another request when key found in cache and haven't expired yet, response would be returned from cache.

### Types

All interfaces, types, and classes could be accessed.

### Type GraphQL

Full type-graphql support would be added some day. Currently it is working only for some classes.

```
import  { OwnedGame }  from  'type-steamapi'
```
