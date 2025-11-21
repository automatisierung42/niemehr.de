/**
 * Einfaches Rate Limiting für API-Endpoints
 * In-Memory Implementation (für Production: Vercel KV oder Redis verwenden)
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

/**
 * Rate Limiting für API-Endpoints
 * @param identifier - Eindeutige ID (z.B. User-Email oder IP)
 * @param maxRequests - Maximale Anzahl Requests im Zeitfenster
 * @param windowMs - Zeitfenster in Millisekunden
 * @returns Rate Limit Status
 */
export function rateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { success: boolean; remaining: number; resetAt?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // Reset wenn Fenster abgelaufen
  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { success: true, remaining: maxRequests - 1 }
  }

  // Limit erreicht
  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: record.resetAt,
    }
  }

  // Increment
  record.count++
  return {
    success: true,
    remaining: maxRequests - record.count,
  }
}

/**
 * Rate Limit für sensible Endpoints
 */
export const rateLimits = {
  deleteAccount: (identifier: string) => rateLimit(identifier, 3, 60 * 60 * 1000), // 3 requests/hour
  dataExport: (identifier: string) => rateLimit(identifier, 10, 60 * 60 * 1000), // 10 requests/hour
  reportResponse: (identifier: string) => rateLimit(identifier, 20, 60 * 60 * 1000), // 20 requests/hour
}

