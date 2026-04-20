require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store (replace with DB in production)
let sites = [];

// Auth middleware
const auth = (req, res, next) => {
  const secret = req.headers['x-api-secret'];
  if (secret !== process.env.API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/sites
app.get('/api/sites', auth, (req, res) => {
  res.json({ sites });
});

// POST /api/sites
app.post('/api/sites', auth, (req, res) => {
  const { name, url, icon = '🌐' } = req.body;
  if (!name || !url) return res.status(400).json({ error: 'name and url are required' });
  const site = { id: uuidv4(), name, url, icon, blocked: false, createdAt: new Date().toISOString() };
  sites.push(site);
  res.status(201).json({ site });
});

// PUT /api/sites/:id
app.put('/api/sites/:id', auth, (req, res) => {
  const site = sites.find(s => s.id === req.params.id);
  if (!site) return res.status(404).json({ error: 'Site not found' });
  Object.assign(site, req.body, { id: site.id });
  res.json({ site });
});

// DELETE /api/sites/:id
app.delete('/api/sites/:id', auth, (req, res) => {
  const index = sites.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Site not found' });
  sites.splice(index, 1);
  res.json({ success: true });
});

// POST /api/prank — Generate a prank link
app.post('/api/prank', auth, (req, res) => {
  const { siteName, baseUrl } = req.body;
  if (!siteName || !baseUrl) return res.status(400).json({ error: 'siteName and baseUrl are required' });
  const prankLink = `${baseUrl}/hack?site=${encodeURIComponent(siteName)}`;
  res.json({ prankLink });
});

app.listen(PORT, () => {
  console.log(`HackBlock API running on port ${PORT}`);
});
