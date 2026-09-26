// ponytail: in-process Map — each serverless instance keeps its own counts and
// they reset on cold start, so a flood spread across instances gets through.
// Fine for a contact form; swap for @upstash/ratelimit (Redis) if this ever
// guards something that costs money.
const buckets = new Map<string, number[]>();

/** True when `key` has already spent its allowance inside the window. */
export function isRateLimited(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
  now: number = Date.now(),
): boolean {
  const recent = (buckets.get(key) ?? []).filter((at) => now - at < windowMs);

  if (recent.length >= max) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);

  // Drop callers whose window has fully expired so the map can't grow forever.
  if (buckets.size > 500) {
    for (const [otherKey, times] of buckets) {
      if (times.every((at) => now - at >= windowMs)) buckets.delete(otherKey);
    }
  }
  return false;
}
