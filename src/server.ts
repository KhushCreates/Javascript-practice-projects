import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Keep original functions for compatibility
export function greet(name: string): string {
    const message = "Hello, " + name + "!";
    console.log(message);
    return message;
}

export function add(a: number, b: number): number {
    const result = a + b;
    return result;
}

// New Express routes
app.get('/', (req, res) => {
    const message = greet('Indian Recipe API');
    res.json({ 
        message: message,
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        service: 'Recipe API',
        version: '1.0.0'
    });
});

// A route that uses original add function
app.get('/api/math/add/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const result = add(a, b);
    
    res.json({
        operation: 'addition',
        numbers: [a, b],
        result: result
    });
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Recipe API Server running on port ${PORT}`);
        console.log(`Visit: http://localhost:${PORT}`);
        greet("Recipe API Server");
    });
}

export default app;