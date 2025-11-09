// src/server.ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Indian Recipe API running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});