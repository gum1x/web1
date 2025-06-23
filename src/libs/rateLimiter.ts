interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(key: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true;
  }

  if (store[key].count >= limit) {
    return false;
  }

  store[key].count++;
  return true;
}

export function getRateLimitInfo(key: string) {
  const info = store[key];
  if (!info) return null;

  return {
    remaining: Math.max(0, 10 - info.count),
    resetTime: info.resetTime,
  };
}
