export interface Asset { sym: string; price: number; base: number; vol: string; }
export interface FeedItem { id: number; msg: string; sev: 'info' | 'warn' | 'crit' | 'ok'; ts: string; }
export interface MetricState { req: number; err: number; lat: number; tp: number; }

export const INITIAL_ASSETS: Asset[] = [
  { sym: 'BTC', price: 67420, base: 67420, vol: '2.1B' },
  { sym: 'ETH', price: 3842,  base: 3842,  vol: '890M' },
  { sym: 'SOL', price: 184,   base: 184,   vol: '420M' },
  { sym: 'AAPL', price: 213.4, base: 213.4, vol: '78M' },
  { sym: 'TSLA', price: 178.2, base: 178.2, vol: '112M' },
  { sym: 'NVDA', price: 875,   base: 875,   vol: '340M' },
];

export const EVENT_TEMPLATES: Array<{ msg: string; sev: FeedItem['sev'] }> = [
  { msg: 'CPU spike detected on node-{n}', sev: 'warn' },
  { msg: 'Request rate exceeded threshold', sev: 'crit' },
  { msg: 'Memory pressure on shard-{n}', sev: 'warn' },
  { msg: 'Deployment completed: v1.{n}.0', sev: 'ok' },
  { msg: 'New connection from 192.168.{n}.{n}', sev: 'info' },
  { msg: 'Cache hit ratio: {n}%', sev: 'info' },
  { msg: 'Latency P99 > 200ms on /api/v2', sev: 'warn' },
  { msg: 'SSL cert renewed — expires +90d', sev: 'ok' },
  { msg: 'Disk I/O saturation on disk-{n}', sev: 'crit' },
  { msg: 'Health check passed — all systems', sev: 'ok' },
  { msg: 'Rate limit triggered for client-{n}', sev: 'warn' },
  { msg: 'Database connection pool exhausted', sev: 'crit' },
];

export const ERROR_MESSAGES = [
  'Connection timeout — retrying (1/3)',
  'Malformed payload received — skipped',
  'Rate limit exceeded — backing off 2s',
  'WebSocket dropped — reconnecting...',
];

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randF = (min: number, max: number) => Math.random() * (max - min) + min;
export const walk = (v: number, min: number, max: number, step: number) =>
  Math.max(min, Math.min(max, v + (Math.random() - 0.48) * step));

export function generateEvent(): FeedItem {
  const tmpl = EVENT_TEMPLATES[rand(0, EVENT_TEMPLATES.length - 1)];
  const msg = tmpl.msg.replace(/\{n\}/g, () => String(rand(1, 99)));
  const ts = new Date().toLocaleTimeString('en', { hour12: false });
  return { id: Date.now() + Math.random(), msg, sev: tmpl.sev, ts };
}

export const COMMON_CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true, mode: 'index' as const, intersect: false,
      backgroundColor: '#141d2e', borderColor: 'rgba(99,120,180,0.3)', borderWidth: 1,
      titleColor: '#7a8db8', bodyColor: '#e2e8f8', padding: 8,
      titleFont: { family: "'JetBrains Mono',monospace", size: 10 },
      bodyFont: { family: "'JetBrains Mono',monospace", size: 11 },
    },
  },
  scales: {
    x: {
      ticks: { color: '#3d4f78', font: { family: "'JetBrains Mono',monospace", size: 9 }, maxRotation: 0, maxTicksLimit: 6 },
      grid: { color: 'rgba(99,120,180,0.06)' },
      border: { color: 'rgba(99,120,180,0.15)' },
    },
    y: {
      ticks: { color: '#3d4f78', font: { family: "'JetBrains Mono',monospace", size: 9 } },
      grid: { color: 'rgba(99,120,180,0.06)' },
      border: { color: 'rgba(99,120,180,0.15)' },
      min: 0, max: 100,
    },
  },
};