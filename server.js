import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000; // Use environment variable or default to 5000

// Middleware to parse JSON (for API endpoints)
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Example API route to fetch candidates
app.get('/api/candidates', (req, res) => {
  const candidates = [
    {
      id: 1,
      login: 'octocat',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      location: 'San Francisco, CA',
      email: 'octocat@github.com',
      company: 'GitHub',
      bio: 'I am the mascot for GitHub!',
    },
  ];
  res.json(candidates);
});

// Catch-all route to serve React's index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
