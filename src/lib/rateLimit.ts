interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per window

  checkLimit(identifier: string): boolean {
    const now = Date.now();
    const record = store[identifier];

    if (!record) {
      store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    if (now > record.resetTime) {
      store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count += 1;
    return true;
  },

  getRemainingTime(identifier: string): number {
    const record = store[identifier];
    if (!record) return 0;
    return Math.max(0, record.resetTime - Date.now());
  },

  getRemainingRequests(identifier: string): number {
    const record = store[identifier];
    if (!record) return this.maxRequests;
    return Math.max(0, this.maxRequests - record.count);
  },
}; 