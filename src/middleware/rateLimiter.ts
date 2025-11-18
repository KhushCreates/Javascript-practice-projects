import rateLimit from 'express-rate-limit';
import { MemoryStore } from 'express-rate-limit';

// Create a memory store for testing
const memoryStore = new MemoryStore();

// Rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: memoryStore, // Use memory store for testing
  skip: (req, res) => process.env.NODE_ENV === 'test' && !req.headers['x-test-rate-limit'], // Skip unless specifically testing rate limiting
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    });
  }
});

export const resetRateLimiter = () => {
  // Reset the memory store for testing
  memoryStore.resetAll();
};
