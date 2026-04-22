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
    hackerNews: true,
    twitter: false
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

  const ideaCount = Math.min(Math.max(parseInt(req.body.count) || 8, 1), 20);
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

  const tenDaysAgo = Date.now() - 10 * 24 * 60 * 60 * 1000;
  const tenDaysAgoSec = Math.floor(tenDaysAgo / 1000);

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
        return items.map(item => {
          const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/))?.[1] || '';
          const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || '';
          const published = pubDate ? new Date(pubDate).getTime() : 0;
          if (published && published < tenDaysAgo) return null;
          const clean = title.replace(/ - [^-]+$/, '').trim();
          return { source: 'Google News', text: clean, author: '' };
        }).filter(s => s && s.text.length > 20);
      })
      .slice(0, 6);
  }

  // ── Source 4: Hacker News ──
  let hnSignals = [];
  if (sources.hackerNews) {
    const sevenDaysAgoSec = tenDaysAgoSec;
    const hnKeywords = ['B2B outbound sales', 'AI sales automation', 'GTM strategy'];
    const hnResults = await Promise.allSettled(
      hnKeywords.map(kw => {
        const q = encodeURIComponent(kw);
        return fetch(`https://hn.algolia.com/api/v1/search?tags=story&query=${q}&numericFilters=created_at_i>${sevenDaysAgoSec}&hitsPerPage=5`)
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

  // ── Source 5: X/Twitter via Apify ──
  let twitterSignals = [];
  if (apifyKey && sources.twitter) {
    try {
      const twRes = await fetch(
        `https://api.apify.com/v2/acts/apidojo~tweet-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=60`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            searchTerms: searchKeywords.slice(0, 2),
            maxTweets: 10,
            queryType: 'Latest',
            ...(process.env.X_COOKIES ? { cookies: process.env.X_COOKIES } : {})
          })
        }
      );
      const twData = await twRes.json().catch(() => []);
      if (Array.isArray(twData)) {
        twitterSignals = twData
          .filter(t => {
            const created = t.createdAt || t.created_at || t.tweet?.createdAt || '';
            if (!created) return true;
            return new Date(created).getTime() >= tenDaysAgo;
          })
          .slice(0, 8)
          .map(t => ({
            source: 'X/Twitter',
            text: (t.text || t.full_text || t.tweet?.text || '').slice(0, 300).replace(/\n+/g, ' '),
            author: t.author?.userName || t.user?.screen_name || t.authorName || ''
          }))
          .filter(s => s.text.length > 20);
      }
    } catch { /* Twitter optional */ }
  }

  const allSignals = [...linkedinSignals, ...profileSignals, ...redditSignals, ...googleNewsSignals, ...hnSignals, ...twitterSignals];

  const signalsBlock = allSignals.length > 0
    ? allSignals.map((s, i) => `[${i + 1}] [${s.source}]${s.author ? ` (${s.author})` : ''} ${s.text}`).join('\n\n')
    : 'No live signals available — base ideas purely on content pillars.';

  const systemPrompt = `You are a LinkedIn content strategist for Luca Carrese, founder of ColdIQ — B2B outbound sales agency at $7M ARR.\n${pillarsContent ? `\n## CONTENT PILLARS\n${pillarsContent}` : ''}${icpContent ? `\n## ICP\n${icpContent}` : ''}`;

  const userPrompt = `Here are live signals from LinkedIn, Reddit, Google News, and Hacker News in Luca's niche right now:\n\n${signalsBlock}\n\nBased on these signals AND the content pillars, generate exactly ${ideaCount} post ideas for Luca.\n\nRules:\n- Each idea needs a specific angle, not just a topic\n- Spread across all 3 content pillars\n- At least ${Math.ceil(ideaCount * 0.35)} ideas must target Tier 1 ICP pain points directly\n- Hooks must follow Luca's voice: specific number, conclusion-first, no hedging\n\nReturn a raw JSON array of exactly ${ideaCount} objects. No markdown fences, no explanation — only the JSON array.\n\nEach object must have exactly these fields:\n{\n  "hook": "The exact hook line — specific, numbered, conclusion-first",\n  "angle": "2-3 sentences on what the post covers and what makes it valuable",\n  "pillar": "GTM Systems" | "Claude Code for GTM" | "AI Agents for Sales",\n  "icpTier": "Tier 1" | "Tier 2" | "Tier 3",\n  "postType": "How-to" | "Story" | "Framework" | "Contrarian" | "Social proof" | "Lead magnet",\n  "signal": "One line on which live signal this is grounded in, or 'Content pillar — no live signal'"\n}`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: Math.max(2048, ideaCount * 300),
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

// ─── TOOLS HELPERS ──────────────────────────────────────────────
function loadFoundation() {
  if (!CLIENT_CONTEXT_DIR) return '';
  const voice   = readMD(path.join(CLIENT_CONTEXT_DIR, 'voice-profile.md'));
  const icp     = readMD(path.join(CLIENT_CONTEXT_DIR, 'icp.md'));
  const pillars = readMD(path.join(CLIENT_CONTEXT_DIR, 'content-pillars.md'));
  return [voice && `# VOICE PROFILE\n${voice}`, icp && `# ICP\n${icp}`, pillars && `# CONTENT PILLARS\n${pillars}`].filter(Boolean).join('\n\n');
}

function loadSkill(name) {
  return readMD(path.join(SKILLS_DIR, name, 'SKILL.md')) || '';
}

async function claudeJSON(system, userPrompt, maxTokens = 3000) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6', max_tokens: maxTokens,
    system, messages: [{ role: 'user', content: userPrompt }]
  });
  const raw = msg.content[0].text.trim();
  try { return JSON.parse(raw); }
  catch { const m = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/); if (m) return JSON.parse(m[0]); throw new Error('Could not parse JSON from Claude response'); }
}

// ─── TOOL: HOOK GENERATOR ───────────────────────────────────────
app.post('/api/tools/hooks', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { topic, category = 'Teach', goal = 'authority', numbers = '', reader = '' } = req.body;
  if (!topic) return res.status(400).json({ error: 'topic is required' });

  const system = `${loadFoundation()}\n\n# HOOK GENERATOR SKILL\n${loadSkill('hook-generator')}`;
  const userPrompt = `Generate LinkedIn hooks for the following post. Apply the full Hook Generator skill process.

Topic: ${topic}
Category: ${category}
Goal: ${goal}
Numbers/Results: ${numbers || 'none provided'}
Target Reader: ${reader || 'Head of Sales / CEO at B2B SaaS'}

Return ONLY a raw JSON object (no markdown fences) with exactly these fields:
{
  "topPicks": [
    { "text": "hook line", "trigger": "Desire|Curiosity|Fear", "template": "template name", "reasoning": "why this works" }
  ],
  "allHooks": [
    { "text": "hook line", "trigger": "Desire|Curiosity|Fear" }
  ]
}
topPicks must have 3–5 items. allHooks must have 15–20 items total (including the top picks).`;

  try {
    const result = await claudeJSON(system, userPrompt, 3000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: POST GRADER ──────────────────────────────────────────
app.post('/api/tools/grade', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { post } = req.body;
  if (!post) return res.status(400).json({ error: 'post is required' });

  const system = `${loadFoundation()}\n\n# POST GRADER SKILL\n${loadSkill('post-grader')}`;
  const userPrompt = `Grade this LinkedIn post using the Post Grader skill rubric.

POST:
${post}

Return ONLY a raw JSON object (no markdown fences) with exactly these fields:
{
  "scores": { "hook": N, "clarity": N, "icp": N, "voice": N, "conversion": N },
  "total": N,
  "verdict": "PASS" | "NEEDS REVISION",
  "observations": { "hook": "specific observation", "clarity": "...", "icp": "...", "voice": "...", "conversion": "..." },
  "diagnosis": {
    "rootCause": "dimension (score) — why it is the root",
    "hypothesis": "the process failure that produced this score",
    "rewriteDirective": ["specific fix 1", "specific fix 2"]
  }
}
diagnosis is required even if verdict is PASS (note what to watch for). observations must reference specific lines from the post.`;

  try {
    const result = await claudeJSON(system, userPrompt, 2000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: REVERSE ENGINEERING ──────────────────────────────────
app.post('/api/tools/reverse', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const apifyKey = process.env.APIFY_API_KEY;
  const ideasSettings = readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS);
  const keyword = req.body.keyword || ideasSettings.keywords[0] || 'B2B outbound sales LinkedIn';

  let posts = [];
  if (apifyKey) {
    try {
      const apifyRes = await fetch(
        `https://api.apify.com/v2/acts/datadoping~linkedin-posts-search-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=60`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keywords: [keyword], maxResults: 25 }) }
      );
      const data = await apifyRes.json();
      if (Array.isArray(data)) {
        posts = data
          .map(p => ({ text: (p.text || p.content || '').slice(0, 600), reactions: p.totalReactions || p.likes || 0, comments: p.commentsCount || p.comments || 0, reposts: p.repostsCount || p.reposts || 0 }))
          .filter(p => p.text.length > 50)
          .sort((a, b) => (b.comments + b.reposts) - (a.comments + a.reposts))
          .slice(0, 20);
      }
    } catch { /* graceful */ }
  }

  if (!posts.length) return res.status(400).json({ error: 'No posts fetched. Check APIFY_API_KEY.' });

  const system = `${loadFoundation()}\n\n# REVERSE ENGINEERING SKILL\n${loadSkill('reverse-engineering')}`;
  const postsBlock = posts.map((p, i) => `[${i+1}] (${p.comments} comments, ${p.reposts} reposts)\n${p.text}`).join('\n\n---\n\n');
  const userPrompt = `Run the full Reverse Engineering skill on these ${posts.length} LinkedIn posts from the niche.

POSTS (sorted by engagement):
${postsBlock}

Return ONLY a raw JSON object (no markdown fences):
{
  "textFrameworks": [
    { "hookLayer": "...", "formatLayer": "...", "framework": "reusable template with zero topic-specific words", "engagementMechanic": "...", "pillar": "GTM Systems|Claude Code for GTM|AI Agents for Sales", "angle": "one post idea using this template" }
  ],
  "visualFrameworks": [
    { "frameworkType": "...", "bigIdea": "...", "pillar": "...", "conceptName": "...", "conceptSentence": "..." }
  ]
}
textFrameworks: 3 items. visualFrameworks: 2 items.`;

  try {
    const result = await claudeJSON(system, userPrompt, 3000);
    res.json({ ...result, postsAnalyzed: posts.length, keyword });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: REPURPOSING ARCHIVE ───────────────────────────────────
app.post('/api/tools/repurpose', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const apifyKey = process.env.APIFY_API_KEY;
  const { profileUrl } = req.body;
  if (!profileUrl) return res.status(400).json({ error: 'profileUrl is required' });
  if (!apifyKey) return res.status(400).json({ error: 'APIFY_API_KEY not set.' });

  let posts = [];
  try {
    const apifyRes = await fetch(
      `https://api.apify.com/v2/acts/datadoping~linkedin-profile-posts-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=90`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profiles: [profileUrl], maxPosts: 100 }) }
    );
    const data = await apifyRes.json();
    if (Array.isArray(data)) {
      posts = data
        .map(p => ({ text: (p.text || p.content || '').slice(0, 400), reactions: p.totalReactions || 0, comments: p.commentsCount || p.comments || 0, reposts: p.repostsCount || p.reposts || 0, date: p.postedAt || '' }))
        .filter(p => p.text.length > 30);
    }
  } catch (err) { return res.status(500).json({ error: `Apify failed: ${err.message}` }); }

  if (!posts.length) return res.status(400).json({ error: 'No posts found for that profile URL.' });

  const system = `${loadFoundation()}\n\n# REPURPOSING ARCHIVE SKILL\n${loadSkill('repurposing-archive')}`;
  const postsBlock = posts.slice(0, 50).map((p, i) => `[${i+1}] (${p.comments} comments, ${p.reposts} reposts, ${p.reactions} reactions)\n${p.text}`).join('\n\n---\n\n');
  const userPrompt = `Run the full Repurposing Archive skill on these ${posts.length} posts from the client's LinkedIn history.

POSTS:
${postsBlock}

Return ONLY a raw JSON object (no markdown fences):
{
  "signatureThemes": ["theme 1", "theme 2", "theme 3"],
  "topPosts": [
    { "preview": "first 100 chars of post", "hookType": "...", "structure": "story|list|framework|contrarian", "engagementScore": N }
  ],
  "gaps": ["missing topic 1 — why it matters for ICP", "missing topic 2", "missing topic 3"],
  "refreshAngles": [
    { "originalPreview": "...", "newAngle": "same insight, new angle — 1 sentence" }
  ]
}
topPosts: top 3 by comments+reposts. gaps: 3 items. refreshAngles: 3 items (one per top post).`;

  try {
    const result = await claudeJSON(system, userPrompt, 3000);
    res.json({ ...result, postsAnalyzed: posts.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: YOUTUBE MINER ────────────────────────────────────────
app.post('/api/tools/youtube', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { keyword, videoUrl } = req.body;
  const ideasSettings = readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS);
  const searchQuery = keyword || ideasSettings.keywords[0] || 'B2B outbound sales';
  const apifyKey = process.env.APIFY_API_KEY;
  const googleKey = process.env.GOOGLE_API_KEY;

  let videos = [];

  // Try YouTube Data API first
  if (googleKey && !videoUrl) {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&order=viewCount&publishedAfter=${thirtyDaysAgo}&maxResults=8&key=${googleKey}`;
      const ytRes = await fetch(ytUrl);
      const ytData = await ytRes.json();
      if (ytData.items) {
        videos = ytData.items.map(v => ({
          title: v.snippet.title,
          channel: v.snippet.channelTitle,
          description: v.snippet.description.slice(0, 300),
          url: `https://youtube.com/watch?v=${v.id.videoId}`,
          published: v.snippet.publishedAt
        }));
      }
    } catch { /* fallthrough */ }
  }

  // If videoUrl provided, use it directly
  if (videoUrl) {
    videos = [{ title: 'Provided video', url: videoUrl, channel: '', description: '' }];
  }

  const system = `${loadFoundation()}\n\n# YOUTUBE MINER SKILL\n${loadSkill('youtube-miner')}`;
  const videoBlock = videos.length
    ? videos.map((v, i) => `[${i+1}] "${v.title}" by ${v.channel}\nURL: ${v.url}\nDescription: ${v.description}`).join('\n\n')
    : `No live videos fetched. Generate ideas based on what would likely be trending for query: "${searchQuery}"`;

  const userPrompt = `Run the YouTube Miner skill for this niche.

Search query: ${searchQuery}
${videoUrl ? `Specific video URL: ${videoUrl}` : ''}

Videos found:
${videoBlock}

Return ONLY a raw JSON object (no markdown fences):
{
  "ideas": [
    {
      "hook": "specific hook line",
      "angle": "2-3 sentences on the post angle",
      "pillar": "GTM Systems|Claude Code for GTM|AI Agents for Sales",
      "icpTier": "Tier 1|Tier 2|Tier 3",
      "postType": "How-to|Story|Framework|Contrarian|Social proof",
      "sourceVideo": "video title or 'No live video'"
    }
  ],
  "frameworks": ["framework 1 extracted", "framework 2", "framework 3"]
}
ideas: 4-5 items. frameworks: 3 reusable structural insights from the videos.`;

  try {
    const result = await claudeJSON(system, userPrompt, 2500);
    res.json({ ...result, videosAnalyzed: videos.length, searchQuery });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: REAL-TIME SIGNAL (Strategist) ────────────────────────
app.post('/api/tools/realtimesignal', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const apifyKey = process.env.APIFY_API_KEY;
  const ideasSettings = readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS);
  const keyword = req.body.keyword || ideasSettings.keywords[0] || 'B2B outbound sales';

  let linkedinPosts = [], redditPosts = [];
  const tenDaysAgo = Date.now() - 10 * 86400000;

  if (apifyKey) {
    try {
      const r = await fetch(
        `https://api.apify.com/v2/acts/datadoping~linkedin-posts-search-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=45`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keywords: [keyword], maxResults: 15 }) }
      );
      const data = await r.json().catch(() => []);
      if (Array.isArray(data)) {
        linkedinPosts = data
          .map(p => ({ text: (p.text || '').slice(0, 400), comments: p.commentsCount || 0, reposts: p.repostsCount || 0, author: p.author?.name || '' }))
          .filter(p => p.text.length > 50)
          .sort((a,b) => (b.comments + b.reposts) - (a.comments + a.reposts))
          .slice(0, 8);
      }
    } catch {}
  }

  try {
    const r = await fetch(`https://www.reddit.com/r/sales+SaaS+Entrepreneur/top.json?limit=8&t=week`, { headers: { 'User-Agent': 'ContentResearchBot/1.0' } });
    const data = await r.ok ? r.json() : null;
    if (data?.data?.children) {
      redditPosts = data.data.children
        .filter(p => new Date(p.data.created_utc * 1000).getTime() >= tenDaysAgo)
        .slice(0, 5)
        .map(p => ({ text: p.data.title, sub: p.data.subreddit, score: p.data.score }));
    }
  } catch {}

  const system = `${loadFoundation()}\n\n# REAL-TIME SIGNAL SKILL\n${loadSkill('real-time-signal')}`;
  const linkedinBlock = linkedinPosts.map((p,i) => `[LI${i+1}] (${p.comments}c ${p.reposts}r) ${p.text}`).join('\n\n');
  const redditBlock = redditPosts.map((p,i) => `[R${i+1}] r/${p.sub}: ${p.text}`).join('\n\n');

  const userPrompt = `Run the Real-Time Signal skill. Find 2-3 live debates worth a POV post.

KEYWORD: ${keyword}

LINKEDIN SIGNALS:
${linkedinBlock || 'None fetched'}

REDDIT SIGNALS:
${redditBlock || 'None fetched'}

Return ONLY a raw JSON object (no markdown fences):
{
  "signals": [
    {
      "debate": "what is being debated in 1-2 sentences",
      "sidePro": "one side of the debate",
      "sideCon": "opposing side",
      "pov": "the POV angle Luca should take — grounded in his content pillars",
      "hookSuggestion": "a specific hook line for a post on this",
      "source": "LinkedIn|Reddit|Both"
    }
  ]
}
signals: 2-3 items.`;

  try {
    const result = await claudeJSON(system, userPrompt, 2000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: COPY DEVELOPER (Write Full Post) ──────────────────────
app.post('/api/tools/write', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { hook, angle, postType = 'How-to', icpTier = 'Tier 1', scraped = '' } = req.body;
  if (!hook && !angle) return res.status(400).json({ error: 'hook or angle required' });

  const copyDev = loadSkill('copy-developer');
  const formatting = readMD(path.join(CLIENT_CONTEXT_DIR || '', 'formatting-profile.md')) || '';
  const system = `${loadFoundation()}${formatting ? `\n\n# FORMATTING PROFILE\n${formatting}` : ''}\n\n# COPY DEVELOPER SKILL\n${copyDev}`;

  const userPrompt = `Write a full LinkedIn post using the Copy Developer skill.

Hook: ${hook || '(derive from angle)'}
Angle: ${angle || '(derive from hook)'}
Post Type: ${postType}
ICP Tier: ${icpTier}
${scraped ? `Reference Material:\n${scraped.slice(0, 1000)}` : ''}

Rules:
- Apply the full voice profile — rhythm, banned vocab, no em dashes, no "here's the thing"
- Match the post type structure exactly
- End with a specific, earned CTA (not bolted on)
- No markdown in the post text itself

Return ONLY a raw JSON object (no markdown fences):
{
  "post": "the full post text, line breaks as \\n",
  "altHooks": ["alternative hook 1", "alternative hook 2"],
  "notes": "one sentence on the structural choice made"
}`;

  try {
    const result = await claudeJSON(system, userPrompt, 2500);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: FOUNDATION REFRESH PING ──────────────────────────────
app.get('/api/tools/ping', (req, res) => {
  if (!CLIENT_CONTEXT_DIR) return res.json({ files: [], warning: 'CLIENT_CONTEXT_DIR not set' });
  const files = ['voice-profile.md', 'icp.md', 'content-pillars.md'];
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const results = files.map(f => {
    const fp = path.join(CLIENT_CONTEXT_DIR, f);
    try {
      const stat = fs.statSync(fp);
      const age = Date.now() - stat.mtimeMs;
      const ageDays = Math.floor(age / 86400000);
      return { file: f, lastModified: stat.mtime.toISOString(), ageDays, needsRefresh: age > thirtyDays };
    } catch { return { file: f, lastModified: null, ageDays: null, needsRefresh: true, missing: true }; }
  });
  res.json({ files: results, checkedAt: new Date().toISOString() });
});

// ─── TOOL: FEEDBACK CAPTURE ──────────────────────────────────────
const LEARNING_LOG_FILE = path.join(__dirname, 'data', 'learning-log.json');
app.get('/api/tools/feedback', (req, res) => res.json(readJSON(LEARNING_LOG_FILE, [])));
app.post('/api/tools/feedback', (req, res) => {
  const { produced, changed, rejected, gradeScore, gradeVerdict, engagementNote, tags } = req.body;
  const log = readJSON(LEARNING_LOG_FILE, []);
  log.unshift({ id: String(Date.now()), date: new Date().toISOString(), produced, changed, rejected, gradeScore, gradeVerdict, engagementNote, tags: tags || [] });
  writeJSON(LEARNING_LOG_FILE, log);
  res.json({ ok: true });
});

// ─── TOOL: CONTENT AUDITOR ───────────────────────────────────────
app.post('/api/tools/audit', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const posts = readJSON(POSTS_FILE, []).slice(0, 50);
  const learningLog = readJSON(LEARNING_LOG_FILE, []).slice(0, 20);
  const system = `${loadFoundation()}\n\n# CONTENT AUDITOR SKILL\n${loadSkill('content-auditor')}`;
  const postsBlock = posts.map((p, i) => `[${i+1}] ${p.status} | ${p.tags?.join(', ') || 'no tags'} | ${(p.body || p.title || '').slice(0, 200)}`).join('\n');
  const userPrompt = `Run a Content Audit on this client's post history.

POSTS (${posts.length} total):
${postsBlock || 'No posts yet'}

LEARNING LOG (${learningLog.length} entries):
${learningLog.slice(0, 5).map(e => `${e.date?.slice(0,10)}: ${e.produced || ''} | Grade: ${e.gradeVerdict || '?'}`).join('\n') || 'None'}

Return ONLY a raw JSON object:
{
  "pillarCoverage": { "GTM Systems": N, "Claude Code for GTM": N, "AI Agents for Sales": N },
  "voiceFreshness": "Fresh|Needs review|Stale",
  "topIssues": ["issue 1", "issue 2", "issue 3"],
  "recommendations": [
    { "priority": "High|Medium|Low", "action": "specific action", "reason": "why" }
  ],
  "summary": "2-sentence summary"
}`;
  try {
    const result = await claudeJSON(system, userPrompt, 2000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: VOICE ANALYZER ────────────────────────────────────────
app.post('/api/tools/voiceanalyze', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { posts: inputPosts } = req.body;
  if (!inputPosts) return res.status(400).json({ error: 'posts required' });
  const system = `${loadFoundation()}\n\n# VOICE ANALYZER SKILL\n${loadSkill('voice-analyzer')}`;
  const userPrompt = `Analyze the voice in these posts and identify patterns, rules, and drift from the existing voice profile.

POSTS:
${inputPosts.slice(0, 3000)}

Return ONLY a raw JSON object:
{
  "patterns": ["pattern 1", "pattern 2", "pattern 3"],
  "driftWarnings": ["any areas drifting from voice profile"],
  "suggestedRules": ["new rule to add", "..."],
  "bannedVocabFound": ["any banned words found"],
  "voiceScore": N,
  "summary": "2-sentence voice health summary"
}`;
  try {
    const result = await claudeJSON(system, userPrompt, 2000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: ICP ANALYZER ──────────────────────────────────────────
app.post('/api/tools/icpanalyze', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: 'answers required' });
  const system = `${loadFoundation()}\n\n# ICP ANALYZER SKILL\n${loadSkill('icp-analyzer')}`;
  const userPrompt = `Build an ICP document from these inputs.

INPUT:
${answers.slice(0, 3000)}

Return ONLY a raw JSON object:
{
  "demographics": { "title": "...", "companySize": "...", "industry": "...", "revenue": "..." },
  "psychographics": ["belief 1", "belief 2", "belief 3"],
  "languageMap": { "painPhrases": ["..."], "desirePhrases": ["..."] },
  "buyingTriggers": ["trigger 1", "trigger 2"],
  "contentTriggers": ["what makes them stop scrolling", "..."],
  "disqualifiers": ["who is NOT the ICP"],
  "summary": "2-sentence ICP summary"
}`;
  try {
    const result = await claudeJSON(system, userPrompt, 2000);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: FORMATTING PROFILE ────────────────────────────────────
app.post('/api/tools/formattingprofile', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: 'answers required' });
  const system = `${loadFoundation()}\n\n# FORMATTING PROFILE SKILL\n${loadSkill('formatting-profile')}`;
  const userPrompt = `Build a formatting profile from these inputs.

INPUT:
${answers.slice(0, 3000)}

Return ONLY a raw JSON object:
{
  "lineBreaks": "rule for line breaks",
  "sentenceLength": "short/medium/mixed — specific rule",
  "punctuation": "specific rules",
  "emphasis": "bold/caps/none — when used",
  "postLength": "target length rule",
  "structure": "preferred structure types",
  "emoji": "emoji usage rule",
  "summary": "1-sentence formatting signature"
}`;
  try {
    const result = await claudeJSON(system, userPrompt, 1500);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── TOOL: WEEKLY IDEA SESSION ───────────────────────────────────
app.post('/api/tools/weekly', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(400).json({ error: 'ANTHROPIC_API_KEY not set.' });
  const apifyKey = process.env.APIFY_API_KEY;
  const ideasSettings = readJSON(IDEAS_SETTINGS_FILE, DEFAULT_IDEAS_SETTINGS);
  const keywords = ideasSettings.keywords.length ? ideasSettings.keywords : DEFAULT_IDEAS_SETTINGS.keywords;
  const { ideasPerWeek = 6 } = req.body;

  // Run LinkedIn + Reddit research in parallel (same as ideas/generate)
  const tenDaysAgo = Date.now() - 10 * 86400000;
  const tenDaysAgoSec = Math.floor(tenDaysAgo / 1000);
  let signals = [];

  const [liResults, redditResults, hnResults] = await Promise.allSettled([
    apifyKey ? fetch(
      `https://api.apify.com/v2/acts/datadoping~linkedin-posts-search-scraper/run-sync-get-dataset-items?token=${apifyKey}&timeout=45`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keywords: keywords.slice(0,2), maxResults: 10 }) }
    ).then(r => r.json()).catch(() => []) : Promise.resolve([]),
    Promise.allSettled(['sales','SaaS','Entrepreneur'].map(sub =>
      fetch(`https://www.reddit.com/r/${sub}/top.json?limit=5&t=week`, { headers: { 'User-Agent': 'ContentResearchBot/1.0' } }).then(r => r.ok ? r.json() : null).catch(() => null)
    )),
    fetch(`https://hn.algolia.com/api/v1/search?tags=story&query=${encodeURIComponent(keywords[0])}&numericFilters=created_at_i>${tenDaysAgoSec}&hitsPerPage=5`).then(r => r.ok ? r.json() : null).catch(() => null)
  ]);

  if (liResults.status === 'fulfilled' && Array.isArray(liResults.value)) {
    signals.push(...liResults.value.slice(0,8).map(p => ({ source:'LinkedIn', text:(p.text||'').slice(0,300) })).filter(s=>s.text.length>30));
  }
  if (redditResults.status === 'fulfilled') {
    const rPosts = redditResults.value.filter(r=>r.status==='fulfilled'&&r.value?.data?.children?.length).flatMap(r=>r.value.data.children).slice(0,6);
    signals.push(...rPosts.map(p=>({ source:'Reddit', text: p.data.title })));
  }
  if (hnResults.status === 'fulfilled' && hnResults.value?.hits) {
    signals.push(...hnResults.value.hits.slice(0,4).map(h=>({ source:'HN', text: h.title||'' })).filter(s=>s.text.length>20));
  }

  const system = `${loadFoundation()}\n\n# WEEKLY IDEA SESSION SKILL\n${loadSkill('weekly-idea-session')}`;
  const signalBlock = signals.map((s,i) => `[${i+1}][${s.source}] ${s.text}`).join('\n');
  const userPrompt = `Run a Weekly Idea Session. Generate ${ideasPerWeek} post ideas for this week.

LIVE SIGNALS:
${signalBlock || 'No signals fetched — use content pillars only'}

Return ONLY a raw JSON object:
{
  "weeklyBatch": [
    {
      "hook": "specific hook",
      "angle": "2-sentence angle",
      "pillar": "GTM Systems|Claude Code for GTM|AI Agents for Sales",
      "icpTier": "Tier 1|Tier 2|Tier 3",
      "postType": "How-to|Story|Framework|Contrarian|Social proof|Lead magnet",
      "category": "Evergreen|Research-based",
      "recommendedDay": "Monday|Tuesday|Wednesday|Thursday|Friday",
      "signal": "source signal or content pillar"
    }
  ],
  "coverageCheck": {
    "tier1Count": N, "tier2Count": N, "evergreenCount": N, "researchCount": N
  }
}
weeklyBatch: exactly ${ideasPerWeek} items.`;

  try {
    const result = await claudeJSON(system, userPrompt, Math.max(2500, ideasPerWeek * 400));
    res.json({ ...result, signalsUsed: signals.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
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
