const buckets = new Map();

export const rateLimiter = ({ windowMs = 60_000, max = 60 } = {}) => {
  return (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"] || "global";
    const now = Date.now();

    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - bucket.count)));
    res.setHeader("X-RateLimit-Reset", String(Math.floor(bucket.resetAt / 1000)));

    if (bucket.count > max) {
      return res.status(429).json({ msg: "Too many requests, please try again later." });
    }
    next();
  };
};

export default rateLimiter;


