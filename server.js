require('dotenv').config({ path: require('path').join(__dirname, '.env') });
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
const IDEAS_SETTINGS_FILE = path.join(DATA_DIR, 'ideas-settings.json');
const CLIENT_CONTEXT_DIR = process.env.CLIENT_CONTEXT_DIR || path.join(__dirname, 'client', 'luca');

const DEFAULT_IDEAS_SETTINGS = {
  keywords: [
    'signal-based outbound Clay list building B2B',
    'Claude Code GTM automation sales workflow',
    'AI agents outbound sales pipeline'
  ],
  profiles: [],
  sources: {
    linkedin: true,
    linkedinProfiles: true,
    reddit: true,
    googleNews: true,
    hackerNews: true
  }
};

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

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
    'post_writer.md':                 { name: 'Post Writer',                   icon: '✍️', category: 'writing',  desc: 'Hook formulas, body structures, CTA types, and voice rules extracted from 15 real high-performing posts.' },
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
  const { prompt, scrapedContent, selectedFileSkills, selectedSkillIds } = req.body;
  const fileSkillsOn = selectedFileSkills || null; // null = all on (default)
  const customSkillsOn = selectedSkillIds || null;
  if (!prompt && !scrapedContent) return res.status(400).json({ error: 'No prompt or scraped content provided' });
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set. Add it to your .env file and Railway environment variables.' });
  }

  // ── Foundation context (voice, ICP, pillars) ──────────────────
  const foundationParts = [];
  if (CLIENT_CONTEXT_DIR) {
    const voiceProfile = readMD(path.join(CLIENT_CONTEXT_DIR, 'voice-profile.md'));
    const icp = readMD(path.join(CLIENT_CONTEXT_DIR, 'icp.md'));
    const pillars = readMD(path.join(CLIENT_CONTEXT_DIR, 'content-pillars.md'));
    if (voiceProfile) foundationParts.push(`# VOICE PROFILE\n\n${voiceProfile}`);
    if (icp) foundationParts.push(`# ICP — IDEAL BUYER\n\n${icp}`);
    if (pillars) foundationParts.push(`# CONTENT PILLARS\n\n${pillars}`);
  }

  // ── Skills context (writing rules, patterns, strategist) ──────
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

  // 3. Post patterns (optional)
  const usePatterns = !fileSkillsOn || fileSkillsOn.includes('_patterns.md');
  if (usePatterns) {
    const patterns = readMD(path.join(EXAMPLES_DIR, '_patterns.md'));
    if (patterns) skillParts.push(`# POST STRUCTURE PATTERNS\n\n${patterns}`);
  }

  // 4. Audience & tone (optional)
  const useTone = !fileSkillsOn || fileSkillsOn.includes('audience_and_tone.md');
  if (useTone) {
    const tone = readMD(path.join(CONTEXT_DIR, 'audience_and_tone.md'));
    if (tone) skillParts.push(`# AUDIENCE & TONE\n\n${tone}`);
  }

  // 5. Other file skills from /skills/ that are selected
  if (fs.existsSync(SKILLS_DIR)) {
    fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md') && !['anti-ai-writing-style.md'].includes(f)).forEach(file => {
      const selected = !fileSkillsOn || fileSkillsOn.includes(file);
      if (!selected) return;
      const content = readMD(path.join(SKILLS_DIR, file));
      if (content) skillParts.push(`# ${file.replace('.md','').toUpperCase()}\n\n${content}`);
    });
  }

  // 6. Custom strategist skills (optional)
  const customSkills = readJSON(STRATEGIST_FILE);
  customSkills.forEach(s => {
    const selected = !customSkillsOn || customSkillsOn.includes(s.id);
    if (s.content && selected) skillParts.push(`# ${s.name.toUpperCase()}\n\n${s.content}`);
  });

  const allContext = [...foundationParts, ...skillParts].join('\n\n---\n\n');

  const systemPrompt = `You are writing LinkedIn posts as Luca Carrese. Follow the voice profile, ICP, and writing rules below exactly — they define who Luca is, who he's writing for, and how he writes.

${allContext}

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

    // Build user message: combine scraped content + prompt
    let userMessage = '';
    if (scrapedContent) {
      userMessage += `SCRAPED CONTENT FOR INSPIRATION:\n"""\n${scrapedContent}\n"""\n\nUse the above as raw inspiration only — do NOT copy it. Extract the core insight or angle, then rewrite it completely in Luca's voice following the system rules.\n\n`;
    }
    if (prompt) {
      userMessage += prompt;
    } else {
      userMessage += 'Write a LinkedIn post inspired by the scraped content above.';
    }

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    stream.on('text', (text) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    });

    stream.on('finalMessage', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

    stream.on('error', (err) => {
      if (!res.headersSent) res.status(500).json({ error: err.message });
      else { res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`); res.end(); }
    });

    // Catch promise-based errors from the stream
    stream.finalMessage().catch((err) => {
      console.error('[stream finalMessage error]', err.message);
    });

  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

// ─── IDEAS SETTINGS ─────────────────────────────────────────────
app.get('/api/ideas/settings', (req, res) => {
  res.json(readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS));
});

app.post('/api/ideas/settings', (req, res) => {
  const { keywords, profiles, sources } = req.body;
  const settings = {
    keywords: Array.isArray(keywords) ? keywords.filter(k => k.trim()) : DEFAULT_IDEAS_SETTINGS.keywords,
    profiles: Array.isArray(profiles) ? profiles.filter(p => p.trim()) : [],
    sources: { ...DEFAULT_IDEAS_SETTINGS.sources, ...(sources || {}) }
  };
  writeJSON(IDEAS_SETTINGS_FILE, settings);
  res.json({ ok: true });
});

// ─── IDEAS GENERATE ─────────────────────────────────────────────
app.post('/api/ideas/generate', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  }

  const apifyKey = process.env.APIFY_API_KEY;
  const pillarsContent = CLIENT_CONTEXT_DIR ? readMD(path.join(CLIENT_CONTEXT_DIR, 'content-pillars.md')) : null;
  const icpContent     = CLIENT_CONTEXT_DIR ? readMD(path.join(CLIENT_CONTEXT_DIR, 'icp.md')) : null;

  const ideasSettings = readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS);
  const searchKeywords = ideasSettings.keywords.length ? ideasSettings.keywords : DEFAULT_IDEAS_SETTINGS.keywords;
  const profileUrls    = ideasSettings.profiles || [];
  const sources        = { ...DEFAULT_IDEAS_SETTINGS.sources, ...(ideasSettings.sources || {}) };

  // ── Source 1: LinkedIn keyword search via Apify ──
  let linkedinSignals = [];
  if (apifyKey && sources.linkedin) {
    const apifyResults = await Promise.allSettled(
      searchKeywords.map(kw =>
        fetch(
          `https://api.apify.com/v2/acts/datadoping~linkedin-posts-search-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=45`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keywords: [kw], maxResults: 5 }) }
        ).then(r => r.json()).catch(() => [])
      )
    );
    linkedinSignals = apifyResults
      .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
      .flatMap(r => r.value)
      .slice(0, 12)
      .map(post => ({
        source: 'LinkedIn',
        text: (post.text || post.content || '').slice(0, 400).replace(/\n+/g, ' '),
        author: post.author?.name || post.author?.headline || ''
      }))
      .filter(s => s.text.length > 30);
  }

  // ── Source 1b: LinkedIn profile posts via Apify ──
  let profileSignals = [];
  if (apifyKey && sources.linkedinProfiles && profileUrls.length) {
    try {
      const profileRes = await fetch(
        `https://api.apify.com/v2/acts/datadoping~linkedin-profile-posts-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=60`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profiles: profileUrls, maxPosts: 5 }) }
      );
      const profileData = await profileRes.json().catch(() => []);
      if (Array.isArray(profileData)) {
        profileSignals = profileData
          .slice(0, 10)
          .map(post => ({
            source: 'LinkedIn Profile',
            text: (post.text || post.content || '').slice(0, 400).replace(/\n+/g, ' '),
            author: post.author?.name || post.authorName || ''
          }))
          .filter(s => s.text.length > 30);
      }
    } catch { /* profile scrape optional */ }
  }

  // ── Source 2: Reddit ──
  let redditSignals = [];
  if (sources.reddit) {
    const redditSubs = ['sales', 'SaaS', 'Entrepreneur', 'startups'];
    const redditResults = await Promise.allSettled(
      redditSubs.map(sub =>
        fetch(`https://www.reddit.com/r/${sub}/top.json?limit=5&t=week`, {
          headers: { 'User-Agent': 'ContentResearchBot/1.0' }
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );
    redditSignals = redditResults
      .filter(r => r.status === 'fulfilled' && r.value?.data?.children?.length)
      .flatMap(r => r.value.data.children)
      .map(p => ({
        source: 'Reddit',
        text: `${p.data.title}${p.data.selftext ? ' — ' + p.data.selftext.slice(0, 200) : ''}`.replace(/\n+/g, ' '),
        author: `r/${p.data.subreddit}`
      }))
      .filter(s => s.text.length > 20)
      .slice(0, 8);
  }

  // ── Source 3: Google News RSS ──
  let googleNewsSignals = [];
  if (sources.googleNews) {
    const gnKeywords = searchKeywords.slice(0, 2);
    const gnResults = await Promise.allSettled(
      gnKeywords.map(kw => {
        const q = encodeURIComponent(kw);
        return fetch(`https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`, {
          headers: { 'User-Agent': 'ContentResearchBot/1.0' }
        }).then(r => r.ok ? r.text() : null).catch(() => null);
      })
    );
    googleNewsSignals = gnResults
      .filter(r => r.status === 'fulfilled' && r.value)
      .flatMap(r => {
        const items = r.value.match(/<item>([\s\S]*?)<\/item>/g) || [];
        return items.slice(0, 4).map(item => {
          const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/))?.[1] || '';
          const clean = title.replace(/ - [^-]+$/, '').trim();
          return { source: 'Google News', text: clean, author: '' };
        }).filter(s => s.text.length > 20);
      })
      .slice(0, 6);
  }

  // ── Source 4: Hacker News ──
  let hnSignals = [];
  if (sources.hackerNews) {
    const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 86400;
    const hnKeywords = ['B2B outbound sales', 'AI sales automation', 'GTM strategy'];
    const hnResults = await Promise.allSettled(
      hnKeywords.map(kw => {
        const q = encodeURIComponent(kw);
        return fetch(`https://hn.algolia.com/api/v1/search?tags=story&query=${q}&numericFilters=created_at_i>${sevenDaysAgo}&hitsPerPage=5`)
          .then(r => r.ok ? r.json() : null).catch(() => null);
      })
    );
    hnSignals = hnResults
      .filter(r => r.status === 'fulfilled' && r.value?.hits?.length)
      .flatMap(r => r.value.hits)
      .map(h => ({
        source: 'Hacker News',
        text: h.title || '',
        author: `${h.points || 0} pts`
      }))
      .filter(s => s.text.length > 20)
      .slice(0, 5);
  }

  const allSignals = [...linkedinSignals, ...profileSignals, ...redditSignals, ...googleNewsSignals, ...hnSignals];

  const signalsBlock = allSignals.length > 0
    ? allSignals.map((s, i) => `[${i + 1}] [${s.source}]${s.author ? ` (${s.author})` : ''} ${s.text}`).join('\n\n')
    : 'No live signals available — base ideas purely on content pillars.';

  const systemPrompt = `You are a LinkedIn content strategist for Luca Carrese, founder of ColdIQ — B2B outbound sales agency at $7M ARR.\n${pillarsContent ? `\n## CONTENT PILLARS\n${pillarsContent}` : ''}${icpContent ? `\n## ICP\n${icpContent}` : ''}`;

  const userPrompt = `Here are live signals from LinkedIn, Reddit, Google News, and Hacker News in Luca's niche right now:\n\n${signalsBlock}\n\nBased on these signals AND the content pillars, generate exactly 8 post ideas for Luca.\n\nRules:\n- Each idea needs a specific angle, not just a topic\n- Spread across all 3 content pillars (at least 2 per pillar)\n- At least 3 ideas must target Tier 1 ICP pain points directly\n- Hooks must follow Luca's voice: specific number, conclusion-first, no hedging\n\nReturn a raw JSON array of exactly 8 objects. No markdown fences, no explanation — only the JSON array.\n\nEach object must have exactly these fields:\n{\n  "hook": "The exact hook line — specific, numbered, conclusion-first",\n  "angle": "2-3 sentences on what the post covers and what makes it valuable",\n  "pillar": "GTM Systems" | "Claude Code for GTM" | "AI Agents for Sales",\n  "icpTier": "Tier 1" | "Tier 2" | "Tier 3",\n  "postType": "How-to" | "Story" | "Framework" | "Contrarian" | "Social proof" | "Lead magnet",\n  "signal": "One line on which live signal this is grounded in, or 'Content pillar — no live signal'"\n}`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });
    let ideas = [];
    const raw = message.content[0].text.trim();
    try { ideas = JSON.parse(raw); }
    catch { const m = raw.match(/\[[\s\S]*\]/); if (m) ideas = JSON.parse(m[0]); }
    res.json({ ideas, signalCount: allSignals.length });
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

// ─── GLOBAL ERROR SAFETY ────────────────────────────────────────
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err.message, err.stack);
});
process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

// ─── START ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Content Hub running → http://localhost:${PORT}\n`);
});
