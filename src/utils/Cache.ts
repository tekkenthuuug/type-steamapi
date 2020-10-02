type CacheValueType<D> = [timestamp: number, data: D];

class Cache<T> {
  cache: Map<string, CacheValueType<T>>;
  expiresIn;

  constructor(expiresIn: number) {
    this.cache = new Map();
    this.expiresIn = expiresIn;
  }

  get(key: string) {
    return this.cache.get(key);
  }

  createCacheKey(key: string, variables: Record<string, string> = {}) {
    return `${key}({${Object.entries(variables).reduce((acc, [key, val]) => {
      if (acc) {
        acc += ',';
      }
      acc += `${key}:${val}`;
      return acc;
    }, '')}})`;
  }

  add(key: string, value: T) {
    return this.cache.set(key, [Date.now() + this.expiresIn, value]);
  }

  getRelevant(key: string) {
    const data = this.get(key);

    if (data && data[0] > Date.now()) {
      return data[1];
    } else {
      return null;
    }
  }
}

export default Cache;
