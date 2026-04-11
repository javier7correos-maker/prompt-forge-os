type RateLimitOptions = {
  limit: number
  windowMs: number
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

type Bucket = {
  count: number
  resetAt: number
}

declare global {
  var __promptForgeRateLimitStore: Map<string, Bucket> | undefined
}

const rateLimitStore = globalThis.__promptForgeRateLimitStore ?? new Map<string, Bucket>()

if (!globalThis.__promptForgeRateLimitStore) {
  globalThis.__promptForgeRateLimitStore = rateLimitStore
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    const resetAt = now + options.windowMs
    rateLimitStore.set(key, { count: 1, resetAt })
    return {
      allowed: true,
      remaining: Math.max(options.limit - 1, 0),
      resetAt,
    }
  }

  if (current.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    }
  }

  current.count += 1
  rateLimitStore.set(key, current)

  return {
    allowed: true,
    remaining: Math.max(options.limit - current.count, 0),
    resetAt: current.resetAt,
  }
}
