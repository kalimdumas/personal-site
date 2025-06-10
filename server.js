// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/new-post', (req, res) => {
  const { title, slug, date, summary, body } = req.body;

  const postsPath = path.join(__dirname, 'blog', 'posts.json');

  // Load and update posts.json
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  posts.unshift({ title, slug, date, summary, body });
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

  res.json({ ok: true });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
