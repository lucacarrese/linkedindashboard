const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const SKILLS_DIR = path.join(__dirname, 'skills');
const EXAMPLES_DIR = path.join(__dirname, 'examples');
const CONTEXT_DIR = path.join(__dirname, 'context');
const STRATEGIST_FILE = path.join(DATA_DIR, 'strategist.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// ─── HELPERS ────────────────────────────────────────────────────
function readJSON(file, defaultVal = []) {
  try {
    if (!fs.existsSync(file)) return defaultVal;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) { return defaultVal; }
}

function writeJSON(file, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function readMD(file) {
  try {
    if (!fs.existsSync(file)) return null;
    return fs.readFileSync(file, 'utf8');
  } catch (e) { return null; }
}

// ─── POSTS ──────────────────────────────────────────────────────
app.get('/api/posts', (req, res) => res.json(readJSON(POSTS_FILE)));

app.post('/api/posts', (req, res) => {
  const posts = readJSON(POSTS_FILE);
  posts.push(req.body);
  writeJSON(POSTS_FILE, posts);
  res.json({ ok: true });
});

app.put('/api/posts/:id', (req, res) => {
  const posts = readJSON(POSTS_FILE);
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts[idx] = req.body;
  writeJSON(POSTS_FILE, posts);
  res.json({ ok: true });
});

app.delete('/api/posts/:id', (req, res) => {
  let posts = readJSON(POSTS_FILE);
  posts = posts.filter(p => p.id !== req.params.id);
  writeJSON(POSTS_FILE, posts);
  res.json({ ok: true });
});

// ─── IDEAS ──────────────────────────────────────────────────────
app.get('/api/ideas', (req, res) => res.json(readJSON(IDEAS_FILE)));

app.post('/api/ideas', (req, res) => {
  const ideas = readJSON(IDEAS_FILE);
  ideas.unshift(req.body);
  writeJSON(IDEAS_FILE, ideas);
  res.json({ ok: true });
});

app.delete('/api/ideas/:id', (req, res) => {
  let ideas = readJSON(IDEAS_FILE);
  ideas = ideas.filter(i => i.id !== req.params.id);
  writeJSON(IDEAS_FILE, ideas);
  res.json({ ok: true });
});

// ─── PROGRESS ───────────────────────────────────────────────────
app.get('/api/progress', (req, res) => res.json(readJSON(PROGRESS_FILE)));

app.post('/api/progress', (req, res) => {
  let progress = readJSON(PROGRESS_FILE);
  const idx = progress.findIndex(p => p.month === req.body.month);
  if (idx >= 0) progress[idx] = req.body;
  else {
    progress.push(req.body);
    progress.sort((a, b) => a.month.localeCompare(b.month));
  }
  // Seed baseline if missing
  if (!progress.find(p => p.month === '2026-02')) {
    progress.unshift({ month: '2026-02', posts: 0, followers: 4763, impressions: 0 });
    progress.sort((a, b) => a.month.localeCompare(b.month));
  }
  writeJSON(PROGRESS_FILE, progress);
  res.json({ ok: true });
});

// ─── SKILLS ─────────────────────────────────────────────────────
app.get('/api/skills', (req, res) => {
  const skills = [];

  const SKILL_META = {
    'analyze_transcript.md':   { name: 'Analyze Transcript',        icon: '📝', category: 'content',  desc: 'Extract post ideas from webinars, interviews, or meeting transcripts.' },
    'add_post_to_dashboard.md':{ name: 'Add Post to Dashboard',     icon: '➕', category: 'workflow', desc: 'Save a finalized post to posts.json and the dashboard.' },
    '_patterns.md':             { name: 'Post Patterns & Structure', icon: '✍️', category: 'writing',  desc: 'Hook formulas, body structure patterns (A/B/C/D), and CTA types.' },
    'audience_and_tone.md':    { name: 'Audience & Tone Guide',     icon: '🎯', category: 'writing',  desc: 'Who we\'re writing for and how to write for them.' },
  };

  // skills/
  if (fs.existsSync(SKILLS_DIR)) {
    fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md')).forEach(file => {
      const meta = SKILL_META[file] || { name: file.replace('.md',''), icon: '📄', category: 'workflow', desc: '' };
      skills.push({ ...meta, filename: file, content: readMD(path.join(SKILLS_DIR, file)) });
    });
  }

  // examples/_patterns.md
  const pf = path.join(EXAMPLES_DIR, '_patterns.md');
  if (fs.existsSync(pf)) {
    const meta = SKILL_META['_patterns.md'];
    skills.push({ ...meta, filename: '_patterns.md', content: readMD(pf) });
  }

  // context/audience_and_tone.md
  const tf = path.join(CONTEXT_DIR, 'audience_and_tone.md');
  if (fs.existsSync(tf)) {
    const meta = SKILL_META['audience_and_tone.md'];
    skills.push({ ...meta, filename: 'audience_and_tone.md', content: readMD(tf) });
  }

  res.json(skills);
});

// ─── LINKEDIN STRATEGIST ────────────────────────────────────────
app.get('/api/strategist', (req, res) => res.json(readJSON(STRATEGIST_FILE)));

app.post('/api/strategist', (req, res) => {
  const skills = readJSON(STRATEGIST_FILE);
  skills.push(req.body);
  writeJSON(STRATEGIST_FILE, skills);
  res.json({ ok: true });
});

app.put('/api/strategist/:id', (req, res) => {
  const skills = readJSON(STRATEGIST_FILE);
  const idx = skills.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  skills[idx] = req.body;
  writeJSON(STRATEGIST_FILE, skills);
  res.json({ ok: true });
});

app.delete('/api/strategist/:id', (req, res) => {
  let skills = readJSON(STRATEGIST_FILE);
  skills = skills.filter(s => s.id !== req.params.id);
  writeJSON(STRATEGIST_FILE, skills);
  res.json({ ok: true });
});

// ─── START ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Content Hub running → http://localhost:${PORT}\n`);
});
