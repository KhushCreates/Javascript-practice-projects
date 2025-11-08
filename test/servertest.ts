import request from 'supertest';
import app from '../src/server';
import { greet, add } from '../src/server';

// Keep your original tests
describe("Original Functions", () => {
    test("should return greeting message", () => {
        const result = greet("World");
        expect(result).toBe("Hello, World!");
    });

    test("should add two numbers", () => {
        const result = add(5, 3);
        expect(result).toBe(8);
    });
});

// New tests for Express API
describe("Express Server", () => {
    test("GET / should return API status", async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Indian Recipe API');
    });

    test("GET /health should return health status", async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('healthy');
    });

    test("GET /api/math/add should use original add function", async () => {
        const response = await request(app).get('/api/math/add/10/5');
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(15);
        expect(response.body.operation).toBe('addition');
    });
});