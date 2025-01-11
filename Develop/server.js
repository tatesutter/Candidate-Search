import express from 'express';
import process from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Define a simple API route (optional)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env['PORT'] || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
