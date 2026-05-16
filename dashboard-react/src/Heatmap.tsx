import React, { useMemo } from 'react';

// ---- HEATMAP ----
interface HeatmapProps { data: number[]; }

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const cells = useMemo(() => {
    const max = Math.max(...data, 1);
    return data.slice(-144).map((v, i) => {
      const ratio = v / max;
      let color: string;
      if (ratio < 0.2)      color = `rgba(13,18,32,${0.3 + ratio})`;
      else if (ratio < 0.5) color = `rgba(29,78,216,${0.4 + ratio * 0.6})`;
      else if (ratio < 0.75) color = `rgba(59,130,246,${0.5 + ratio * 0.5})`;
      else                  color = `rgba(239,68,68,${0.6 + ratio * 0.4})`;
      return { color, val: Math.round(v), key: i };
    });
  }, [data]);

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Activity Heatmap</div>
        <span style={{ fontSize: '10px', color: 'var(--dim)' }}>Last 144 intervals</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '2px', padding: '12px 16px' }}>
        {cells.map(({ color, val, key }) => (
          <div key={key} title={`${val} req/s`} style={{ aspectRatio: '1', borderRadius: '2px', background: color, transition: 'transform 0.15s', cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.3)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px 10px', fontSize: '10px', color: 'var(--dim)' }}>
        <span>Low</span>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'linear-gradient(to right,#0d1220,#1d4ed8,#3b82f6,#60a5fa,#ef4444)' }} />
        <span>High</span>
      </div>
    </div>
  );
};

// ---- GAUGE ----
const Gauge: React.FC<{ val: number; label: string; color: string }> = ({ val, label, color }) => {
  const pct = Math.min(val, 100);
  const r = 28, cx = 36, cy = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="72" height="72" viewBox="0 0 72 72" aria-label={`${label}: ${Math.round(pct)}%`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(99,120,180,0.1)" strokeWidth="5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
          strokeDashoffset={(circ / 4).toFixed(1)}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
        <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontFamily="'Syne',sans-serif" fontSize="13" fontWeight="700">
          {Math.round(pct)}%
        </text>
      </svg>
      <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: 4 }}>{label}</div>
    </div>
  );
};

interface GaugePanelProps {
  cpu: number; mem: number; net: number;
  services: Array<{ name: string; val: number; color: string }>;
}

export const GaugePanel: React.FC<GaugePanelProps> = ({ cpu, mem, net, services }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>System Gauges</div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', padding: '2px 7px', borderRadius: '2px', background: 'rgba(59,130,246,0.15)', color: 'var(--accent2)', border: '1px solid rgba(59,130,246,0.25)' }}>LIVE</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', padding: '12px 16px' }}>
      <Gauge val={cpu} label="CPU"     color="#3b82f6" />
      <Gauge val={mem} label="Memory"  color="#10b981" />
      <Gauge val={net} label="Network" color="#06b6d4" />
    </div>
    <div style={{ padding: '6px 16px' }}>
      {services.map(s => (
        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', width: '60px', flexShrink: 0 }}>{s.name}</span>
          <div style={{ flex: 1, height: 4, background: 'var(--surface2)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: s.color, width: `${s.val}%`, transition: 'width 0.6s ease' }} />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text)', width: '40px', textAlign: 'right' }}>{s.val}%</span>
        </div>
      ))}
    </div>
  </div>
);