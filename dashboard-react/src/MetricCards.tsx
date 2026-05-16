import React from 'react';
import { MetricState } from './data';

interface MetricCardsProps { metrics: MetricState; prevMetrics: MetricState; }

const MetricCards: React.FC<MetricCardsProps> = ({ metrics, prevMetrics }) => {
  const cards = [
    {
      label: 'Requests / sec', value: Math.round(metrics.req).toLocaleString(),
      delta: ((metrics.req - prevMetrics.req) / (prevMetrics.req || 1)) * 100,
      fmt: (d: number) => `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%`,
      positive: (d: number) => d >= 0,
      accentColor: 'var(--accent)',
    },
    {
      label: 'Throughput', value: metrics.tp.toFixed(1) + ' GB/s',
      delta: metrics.tp - prevMetrics.tp,
      fmt: (d: number) => `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(2)} GB/s`,
      positive: (d: number) => d >= 0,
      accentColor: 'var(--green)',
    },
    {
      label: 'Error Rate', value: metrics.err.toFixed(2) + '%',
      delta: metrics.err - prevMetrics.err,
      fmt: (d: number) => `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(2)}%`,
      positive: (d: number) => d <= 0,
      accentColor: 'var(--red)',
    },
    {
      label: 'P95 Latency', value: Math.round(metrics.lat) + 'ms',
      delta: metrics.lat - prevMetrics.lat,
      fmt: (d: number) => `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(0)}ms`,
      positive: (d: number) => d <= 0,
      accentColor: 'var(--purple)',
    },
  ];

  return (
    <div className="metric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
      {cards.map((c) => {
        const isPositive = c.positive(c.delta);
        return (
          <div key={c.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px 16px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: c.accentColor }} />
            <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>{c.label}</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '26px', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: '4px' }}>{c.value}</div>
            <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: isPositive ? 'var(--green)' : 'var(--red)' }}>
              {c.fmt(c.delta)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;