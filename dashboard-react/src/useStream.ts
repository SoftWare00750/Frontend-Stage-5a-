import { useState, useEffect, useRef, useCallback } from 'react';
import type { Asset, FeedItem, MetricState } from './data';
import { INITIAL_ASSETS, walk, rand, randF, generateEvent } from './data';

export interface StreamState {
  streaming: boolean;
  maxPoints: number;
  datasets: { CPU: boolean; Memory: boolean; Network: boolean };
  // Metrics
  metrics: MetricState;
  prevMetrics: MetricState;
  // System
  cpu: number; mem: number; net: number;
  // Chart data (rolling arrays)
  lineLabels: string[];
  cpuData: (number | null)[];
  memData: (number | null)[];
  netData: (number | null)[];
  barData: number[];
  areaData: number[];
  // Heatmap
  heatmap: number[];
  // Assets
  assets: Asset[];
  // Feed
  feedItems: FeedItem[];
  feedFilter: string;
  // UI
  latency: number;
  lastUpdate: string;
  // Gauges
  services: Array<{ name: string; val: number; color: string }>;
  // Error
  errorMsg: string | null;
}

const N_LINE = 60;
const N_BAR  = 15;
const N_AREA = 30;

function makeLabels(n: number): string[] {
  const now = Date.now();
  return Array.from({ length: n }, (_, i) =>
    new Date(now - (n - 1 - i) * 1000).toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
}

export function useStream() {
  const [state, setState] = useState<StreamState>(() => {
    let cpu = 45, mem = 62, net = 38;
    const cpuArr: number[] = [], memArr: number[] = [], netArr: number[] = [];
    const heatmap: number[] = [];
    for (let i = 0; i < N_LINE; i++) {
      cpu = walk(cpu, 5, 95, 8); mem = walk(mem, 20, 90, 5); net = walk(net, 5, 80, 10);
      cpuArr.push(cpu); memArr.push(mem); netArr.push(net);
      heatmap.push(rand(800, 2400));
    }
    const barArr  = Array.from({ length: N_BAR  }, () => rand(800, 2400));
    const areaArr = Array.from({ length: N_AREA }, () => parseFloat(randF(0.2, 3.5).toFixed(2)));
    const feedItems: FeedItem[] = Array.from({ length: 20 }, (_, i) => {
      const e = generateEvent();
      const d = new Date(Date.now() - (20 - i) * 3000 * rand(1, 4));
      return { ...e, ts: d.toLocaleTimeString('en', { hour12: false }) };
    });
    return {
      streaming: true, maxPoints: N_LINE,
      datasets: { CPU: true, Memory: true, Network: true },
      metrics:     { req: 1240, err: 0.8, lat: 42, tp: 3.2 },
      prevMetrics: { req: 1240, err: 0.8, lat: 42, tp: 3.2 },
      cpu, mem, net,
      lineLabels: makeLabels(N_LINE),
      cpuData: cpuArr, memData: memArr, netData: netArr,
      barData: barArr, areaData: areaArr,
      heatmap, assets: INITIAL_ASSETS.map(a => ({ ...a })),
      feedItems, feedFilter: '', latency: 12,
      lastUpdate: new Date().toLocaleTimeString('en', { hour12: false }),
      services: [], errorMsg: null,
    };
  });

  const errorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.streaming) return prev;
      const now = new Date().toLocaleTimeString('en', { hour12: false });

      const cpu  = walk(prev.cpu,  5, 95, 8);
      const mem  = walk(prev.mem,  20, 90, 5);
      const net  = walk(prev.net,  5, 80, 10);
      const reqV = walk(prev.prevMetrics.req, 800, 2400, 120);
      const errV = walk(prev.prevMetrics.err, 0.1, 4.5, 0.3);
      const latV = walk(prev.prevMetrics.lat, 20, 200, 15);
      const tpV  = walk(prev.prevMetrics.tp,  1.2, 6.8, 0.3);

      const newLabels = [...prev.lineLabels, now].slice(-prev.maxPoints);
      const newCpu  = [...prev.cpuData,  prev.datasets.CPU     ? cpu  : null].slice(-prev.maxPoints) as (number|null)[];
      const newMem  = [...prev.memData,  prev.datasets.Memory  ? mem  : null].slice(-prev.maxPoints) as (number|null)[];
      const newNet  = [...prev.netData,  prev.datasets.Network ? net  : null].slice(-prev.maxPoints) as (number|null)[];
      const newBar  = [...prev.barData,  Math.round(walk(reqV, 800, 2400, 150))].slice(-N_BAR);
      const newArea = [...prev.areaData, parseFloat(walk(errV, 0.1, 4.5, 0.4).toFixed(2))].slice(-N_AREA);

      const hm = [...prev.heatmap, reqV].slice(-144);

      const assets = prev.assets.map(a => ({
        ...a,
        price: Math.max(a.price * 0.9, a.price + (Math.random() - 0.495) * a.price * 0.004),
      }));

      const services = [
        { name: 'API',   val: rand(20, 95), color: '#3b82f6' },
        { name: 'DB',    val: rand(30, 85), color: '#8b5cf6' },
        { name: 'Cache', val: rand(10, 70), color: '#10b981' },
        { name: 'CDN',   val: rand(40, 99), color: '#f59e0b' },
      ];

      return {
        ...prev, cpu, mem, net,
        lineLabels: newLabels, cpuData: newCpu, memData: newMem, netData: newNet,
        barData: newBar, areaData: newArea, heatmap: hm, assets, services,
        metrics:     { req: reqV, err: errV, lat: latV, tp: tpV },
        prevMetrics: { req: reqV, err: errV, lat: latV, tp: tpV },
        latency: rand(8, 45),
        lastUpdate: now,
      };
    });
  }, []);

  const addEvent = useCallback(() => {
    setState(prev => {
      if (!prev.streaming) return prev;
      if (Math.random() < 0.3) return prev;
      const e = generateEvent();
      const feedItems = [e, ...prev.feedItems].slice(0, 200);
      return { ...prev, feedItems };
    });
  }, []);

  useEffect(() => {
    const t1 = setInterval(tick, 1000);
    const t2 = setInterval(addEvent, 1400);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [tick, addEvent]);

  const toggleStream = useCallback(() => {
    setState(prev => ({ ...prev, streaming: !prev.streaming }));
  }, []);

  const setRange = useCallback((range: string) => {
    const pts: Record<string, number> = { '1m': 60, '5m': 120, '15m': 180, '1h': 240 };
    setState(prev => ({ ...prev, maxPoints: pts[range] ?? 60 }));
  }, []);

  const toggleDataset = useCallback((name: 'CPU' | 'Memory' | 'Network') => {
    setState(prev => ({ ...prev, datasets: { ...prev.datasets, [name]: !prev.datasets[name] } }));
  }, []);

  const setFeedFilter = useCallback((v: string) => {
    setState(prev => ({ ...prev, feedFilter: v }));
  }, []);

  const simulateError = useCallback((msgs: string[]) => {
    const msg = msgs[rand(0, msgs.length - 1)];
    const e: FeedItem = { id: Date.now(), msg, sev: 'crit', ts: new Date().toLocaleTimeString('en', { hour12: false }) };
    setState(prev => ({ ...prev, errorMsg: msg, feedItems: [e, ...prev.feedItems].slice(0, 200) }));
    if (errorTimeout.current) clearTimeout(errorTimeout.current);
    errorTimeout.current = setTimeout(() => setState(prev => ({ ...prev, errorMsg: null })), 4000);
  }, []);

  return { state, toggleStream, setRange, toggleDataset, setFeedFilter, simulateError };
}