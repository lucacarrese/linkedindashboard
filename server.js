const express = require('express');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

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
    'anti-ai-writing-style.md':      { name: 'Anti-AI Writing Style',         icon: '🚫', category: 'writing',  desc: 'Read this first. Rules for writing that sounds human, not AI-generated.' },
    'analyze_transcript.md':         { name: 'Analyze Transcript',            icon: '📝', category: 'content',  desc: 'Extract post ideas from webinars, interviews, or meeting transcripts.' },
    'add_post_to_dashboard.md':      { name: 'Add Post to Dashboard',         icon: '➕', category: 'workflow', desc: 'Save a finalized post to posts.json and the dashboard.' },
    '_patterns.md':                  { name: 'Post Patterns & Structure',     icon: '✍️', category: 'writing',  desc: 'Hook formulas, body structure patterns (A/B/C/D), and CTA types.' },
    'audience_and_tone.md':          { name: 'Audience & Tone Guide',         icon: '🎯', category: 'writing',  desc: 'Who we\'re writing for and how to write for them.' },
    'coldiq-linkedin-competition':   { name: 'ColdIQ LinkedIn Competition',   icon: '🏆', category: 'strategy', desc: 'Q2 competition rules, scoring strategy, partner tagging guide, and post formats.' },
  };

  if (fs.existsSync(SKILLS_DIR)) {
    const entries = fs.readdirSync(SKILLS_DIR);

    // Single .md files
    entries.filter(f => f.endsWith('.md')).forEach(file => {
      const meta = SKILL_META[file] || { name: file.replace('.md',''), icon: '📄', category: 'workflow', desc: '' };
      skills.push({ ...meta, filename: file, content: readMD(path.join(SKILLS_DIR, file)) });
    });

    // Folder-based skills (contain SKILL.md)
    entries.filter(f => {
      const p = path.join(SKILLS_DIR, f);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'SKILL.md'));
    }).forEach(folder => {
      const folderPath = path.join(SKILLS_DIR, folder);
      const meta = SKILL_META[folder] || { name: folder, icon: '📦', category: 'strategy', desc: '' };
      let content = readMD(path.join(folderPath, 'SKILL.md')) || '';

      // Append any reference files
      const refsDir = path.join(folderPath, 'references');
      if (fs.existsSync(refsDir)) {
        fs.readdirSync(refsDir).filter(f => f.endsWith('.md')).forEach(ref => {
          const refContent = readMD(path.join(refsDir, ref));
          if (refContent) content += `\n\n---\n\n${refContent}`;
        });
      }
      skills.push({ ...meta, filename: folder, content });
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

// ─── GENERATE POST (Claude API) ─────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set. Add it to your .env file and Railway environment variables.' });
  }

  // Build system prompt from all skills
  const skillParts = [];

  // 1. Always load anti-AI writing style first
  const antiAI = readMD(path.join(SKILLS_DIR, 'anti-ai-writing-style.md'));
  if (antiAI) skillParts.push(`# WRITING STYLE RULES (read first)\n\n${antiAI}`);

  // 2. Competition skill (folder-based)
  const compSkillPath = path.join(SKILLS_DIR, 'coldiq-linkedin-competition');
  const compMain = readMD(path.join(compSkillPath, 'SKILL.md'));
  if (compMain) {
    let compContent = compMain;
    const refsDir = path.join(compSkillPath, 'references');
    if (fs.existsSync(refsDir)) {
      fs.readdirSync(refsDir).filter(f => f.endsWith('.md')).forEach(ref => {
        const rc = readMD(path.join(refsDir, ref));
        if (rc) compContent += `\n\n---\n\n${rc}`;
      });
    }
    skillParts.push(`# COLDIQ LINKEDIN COMPETITION STRATEGY\n\n${compContent}`);
  }

  // 3. Post patterns
  const patterns = readMD(path.join(EXAMPLES_DIR, '_patterns.md'));
  if (patterns) skillParts.push(`# POST STRUCTURE PATTERNS\n\n${patterns}`);

  // 4. Audience & tone
  const tone = readMD(path.join(CONTEXT_DIR, 'audience_and_tone.md'));
  if (tone) skillParts.push(`# AUDIENCE & TONE\n\n${tone}`);

  // 5. Custom strategist skills
  const customSkills = readJSON(STRATEGIST_FILE);
  customSkills.forEach(s => {
    if (s.content) skillParts.push(`# ${s.name.toUpperCase()}\n\n${s.content}`);
  });

  const systemPrompt = `You are a LinkedIn content writer for Luca Carrese, founder of ColdIQ — a B2B outbound sales agency at $7M ARR.

Your job is to write high-performing LinkedIn posts for Luca's personal brand. Every post must follow the rules below exactly.

${skillParts.join('\n\n---\n\n')}

---

OUTPUT FORMAT:
- Return only the finished post text, ready to copy-paste into LinkedIn
- No preamble, no explanation, no "Here's the post:"
- No markdown formatting in the output — plain text only
- Do not add a title or subject line`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Stream the response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }]
    });

    stream.on('text', (text) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    });

    stream.on('finalMessage', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

    stream.on('error', (err) => {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
