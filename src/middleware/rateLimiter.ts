
import rateLimit from 'express-rate-limit';
import { MemoryStore } from 'express-rate-limit';

const authMemoryStore = new MemoryStore();
const sensitiveMemoryStore = new MemoryStore();
const apiMemoryStore = new MemoryStore();

// Rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: authMemoryStore,
  skip: (req, res) => process.env.NODE_ENV === 'test' && !req.headers['x-test-rate-limit'],
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    });
  }
});

// Extended rate limiter for sensitive routes (login, register, favorites creation)
export const sensitiveDataRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Example: Limit each IP to 10 requests per 15 minutes for sensitive endpoints
  message: {
    error: 'Too many requests from this IP on sensitive endpoints, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: sensitiveMemoryStore,
  skip: (req, res) => process.env.NODE_ENV === 'test' && !req.headers['x-test-rate-limit'],
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests from this IP on sensitive endpoints, please try again later.',
      retryAfter: '15 minutes'
    });
  }
});

// General API rate limiter with configurable options
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: apiMemoryStore,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '1 hour'
    });
  }
});

export const resetRateLimiter = () => {
  // Reset memory stores used by rate limiters to allow fresh tests
  authMemoryStore.resetAll();
  sensitiveMemoryStore.resetAll();
  apiMemoryStore.resetAll();
};
