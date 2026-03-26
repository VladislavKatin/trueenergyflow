type RateEntry = { count: number; resetAt: number };

type LimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const globalStore = globalThis as unknown as {
  __rateLimitStores?: Map<string, Map<string, RateEntry>>;
};

if (!globalStore.__rateLimitStores) {
  globalStore.__rateLimitStores = new Map<string, Map<string, RateEntry>>();
}

function getStore(namespace: string): Map<string, RateEntry> {
  const stores = globalStore.__rateLimitStores!;
  if (!stores.has(namespace)) {
    stores.set(namespace, new Map<string, RateEntry>());
  }
  return stores.get(namespace)!;
}

function cleanupExpiredEntries(store: Map<string, RateEntry>, now: number) {
  for (const [key, value] of store.entries()) {
    if (now > value.resetAt) {
      store.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  const cfIp = request.headers.get("cf-connecting-ip");
  return (cfIp || fwd?.split(",")[0] || "unknown").trim();
}

export function applyRateLimit(options: {
  namespace: string;
  key: string;
  windowMs: number;
  maxRequests: number;
}): LimitResult {
  const { namespace, key, windowMs, maxRequests } = options;
  const now = Date.now();
  const store = getStore(namespace);
  cleanupExpiredEntries(store, now);

  const existing = store.get(key);
  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: Math.max(0, maxRequests - 1), resetAt };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  store.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    resetAt: existing.resetAt
  };
}
