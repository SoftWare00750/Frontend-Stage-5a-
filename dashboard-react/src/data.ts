// ─── Types ────────────────────────────────────────────────────
export interface Asset { sym: string; price: number; base: number; vol: string; }
export interface FeedItem { id: number; msg: string; sev: 'info' | 'warn' | 'crit' | 'ok'; ts: string; }
export interface MetricState { req: number; err: number; lat: number; tp: number; }

export interface Project {
  id: number;
  emoji: string;
  gradient: string;
  badge: string;
  category: 'svelte' | '3d' | 'fullstack';
  title: string;
  desc: string;
  tags: string[];
  demo: string;
  github: string;
}

export interface Skill {
  name: string;
  pct: number;
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  desc: string;
}

// ─── Portfolio data ───────────────────────────────────────────
export const SKILLS: Skill[] = [
  { name: 'Svelte / SvelteKit', pct: 95 },
  { name: 'TypeScript',         pct: 90 },
  { name: 'Animation / GSAP',   pct: 88 },
  { name: 'Three.js / WebGL',   pct: 75 },
  { name: 'UI/UX Design',       pct: 82 },
  { name: 'Performance Optimization', pct: 91 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    emoji: '🌌',
    gradient: 'linear-gradient(135deg,#1a1240,#2d1b69)',
    badge: 'Svelte',
    category: 'svelte',
    title: 'Cosmos UI — Design System',
    desc: 'A production-grade component library built with Svelte. 60+ accessible components, dark mode, and a token-based theming engine.',
    tags: ['SvelteKit', 'TypeScript', 'CSS vars'],
    demo: '#',
    github: '#',
  },
  {
    id: 2,
    emoji: '🌊',
    gradient: 'linear-gradient(135deg,#0c2340,#1a4a7a)',
    badge: 'Three.js',
    category: '3d',
    title: 'Fluid — Interactive 3D Globe',
    desc: 'A WebGL-powered data visualization tool featuring an interactive 3D globe with real-time data overlays and fluid particle simulations.',
    tags: ['Three.js', 'GLSL', 'Svelte'],
    demo: '#',
    github: '#',
  },
  {
    id: 3,
    emoji: '📊',
    gradient: 'linear-gradient(135deg,#0d2010,#1a4a20)',
    badge: 'Full Stack',
    category: 'fullstack',
    title: 'Pulse — Analytics Dashboard',
    desc: 'Real-time analytics platform processing 100k+ events/day. Built with SvelteKit + Node.js, featuring live charts and custom data pipelines.',
    tags: ['SvelteKit', 'Node.js', 'PostgreSQL'],
    demo: '#',
    github: '#',
  },
  {
    id: 4,
    emoji: '🎵',
    gradient: 'linear-gradient(135deg,#2d0a2e,#6b1a6d)',
    badge: 'Svelte',
    category: 'svelte',
    title: 'Resonance — Music Visualizer',
    desc: 'Web Audio API meets SVG animation. An interactive music visualizer that generates real-time visuals from audio frequency data.',
    tags: ['Web Audio API', 'SVG', 'Svelte'],
    demo: '#',
    github: '#',
  },
  {
    id: 5,
    emoji: '🏗️',
    gradient: 'linear-gradient(135deg,#1a0a00,#4a2a00)',
    badge: '3D',
    category: '3d',
    title: 'Archviz — 3D Product Showcase',
    desc: 'A cinematic 3D product configurator with real-time material swapping, camera animations, and AR-ready model export.',
    tags: ['Three.js', 'GSAP', 'WebXR'],
    demo: '#',
    github: '#',
  },
  {
    id: 6,
    emoji: '🤖',
    gradient: 'linear-gradient(135deg,#001a2d,#003d66)',
    badge: 'AI',
    category: 'fullstack',
    title: 'Synthia — AI Writing Tool',
    desc: 'An AI-powered writing assistant with a custom rich-text editor, context-aware suggestions, and a streamed generation UI.',
    tags: ['SvelteKit', 'OpenAI', 'Redis'],
    demo: '#',
    github: '#',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2023 — Present',
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    desc: 'Leading the design system team, building core UI infrastructure used by 50k+ developers. Shipped the new dashboard experience and reduced bundle size by 40%.',
  },
  {
    period: '2021 — 2023',
    company: 'Figma',
    role: 'Frontend Engineer II',
    desc: 'Worked on the canvas rendering engine and plugin API. Contributed to the FigJam launch with custom real-time collaboration components using CRDTs.',
  },
  {
    period: '2019 — 2021',
    company: 'Shopify',
    role: 'Frontend Developer',
    desc: 'Built merchant-facing features for the Shopify Admin. Migrated legacy React components to modern patterns, improved accessibility scores across the platform.',
  },
  {
    period: '2018 — 2019',
    company: 'Freelance',
    role: 'Creative Developer',
    desc: 'Designed and built interactive websites for agencies and startups. Specialized in scroll-driven animations, WebGL backgrounds, and immersive landing pages.',
  },
];

// ─── Dashboard data ───────────────────────────────────────────
export const INITIAL_ASSETS: Asset[] = [
  { sym: 'BTC',  price: 67420, base: 67420, vol: '2.1B' },
  { sym: 'ETH',  price: 3842,  base: 3842,  vol: '890M' },
  { sym: 'SOL',  price: 184,   base: 184,   vol: '420M' },
  { sym: 'AAPL', price: 213.4, base: 213.4, vol: '78M'  },
  { sym: 'TSLA', price: 178.2, base: 178.2, vol: '112M' },
  { sym: 'NVDA', price: 875,   base: 875,   vol: '340M' },
];

export const EVENT_TEMPLATES: Array<{ msg: string; sev: FeedItem['sev'] }> = [
  { msg: 'CPU spike detected on node-{n}',         sev: 'warn' },
  { msg: 'Request rate exceeded threshold',        sev: 'crit' },
  { msg: 'Memory pressure on shard-{n}',           sev: 'warn' },
  { msg: 'Deployment completed: v1.{n}.0',         sev: 'ok'   },
  { msg: 'New connection from 192.168.{n}.{n}',    sev: 'info' },
  { msg: 'Cache hit ratio: {n}%',                  sev: 'info' },
  { msg: 'Latency P99 > 200ms on /api/v2',         sev: 'warn' },
  { msg: 'SSL cert renewed — expires +90d',        sev: 'ok'   },
  { msg: 'Disk I/O saturation on disk-{n}',        sev: 'crit' },
  { msg: 'Health check passed — all systems',      sev: 'ok'   },
  { msg: 'Rate limit triggered for client-{n}',    sev: 'warn' },
  { msg: 'Database connection pool exhausted',     sev: 'crit' },
];

export const ERROR_MESSAGES = [
  'Connection timeout — retrying (1/3)',
  'Malformed payload received — skipped',
  'Rate limit exceeded — backing off 2s',
  'WebSocket dropped — reconnecting...',
];

// ─── Helpers ──────────────────────────────────────────────────
export const rand  = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
export const randF = (min: number, max: number) =>
  Math.random() * (max - min) + min;
export const walk  = (v: number, min: number, max: number, step: number) =>
  Math.max(min, Math.min(max, v + (Math.random() - 0.48) * step));

export function generateEvent(): FeedItem {
  const tmpl = EVENT_TEMPLATES[rand(0, EVENT_TEMPLATES.length - 1)];
  const msg  = tmpl.msg.replace(/\{n\}/g, () => String(rand(1, 99)));
  const ts   = new Date().toLocaleTimeString('en', { hour12: false });
  return { id: Date.now() + Math.random(), msg, sev: tmpl.sev, ts };
}

export const COMMON_CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#141d2e',
      borderColor: 'rgba(99,120,180,0.3)',
      borderWidth: 1,
      titleColor: '#7a8db8',
      bodyColor: '#e2e8f8',
      padding: 8,
      titleFont: { family: "'JetBrains Mono',monospace", size: 10 },
      bodyFont:  { family: "'JetBrains Mono',monospace", size: 11 },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#3d4f78',
        font: { family: "'JetBrains Mono',monospace", size: 9 },
        maxRotation: 0,
        maxTicksLimit: 6,
      },
      grid:   { color: 'rgba(99,120,180,0.06)' },
      border: { color: 'rgba(99,120,180,0.15)' },
    },
    y: {
      ticks: {
        color: '#3d4f78',
        font: { family: "'JetBrains Mono',monospace", size: 9 },
      },
      grid:   { color: 'rgba(99,120,180,0.06)' },
      border: { color: 'rgba(99,120,180,0.15)' },
      min: 0,
      max: 100,
    },
  },
};
