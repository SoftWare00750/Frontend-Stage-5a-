import React, { useState } from 'react';

interface ControlsProps {
  datasets: { CPU: boolean; Memory: boolean; Network: boolean };
  lastUpdate: string;
  onSetRange: (r: string) => void;
  onToggleDataset: (name: 'CPU' | 'Memory' | 'Network') => void;
}

const RANGES = ['1m', '5m', '15m', '1h'];
const DATASETS = ['CPU', 'Memory', 'Network'] as const;

const Controls: React.FC<ControlsProps> = ({ datasets, lastUpdate, onSetRange, onToggleDataset }) => {
  const [activeRange, setActiveRange] = useState('1m');

  const btn = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px', border: `1px solid ${active ? 'var(--accent)' : 'var(--border2)'}`,
    borderRadius: '4px', background: active ? 'var(--accent)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text)', fontFamily: 'var(--mono)', fontSize: '11px',
    cursor: 'pointer', transition: 'all 0.15s', letterSpacing: '0.3px',
  });

  const label: React.CSSProperties = { color: 'var(--dim)', fontSize: '10px', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '1px' };
  const divider: React.CSSProperties = { width: 1, height: 20, background: 'var(--border)', margin: '0 8px' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexWrap: 'wrap' }}>
      <span style={label}>Range</span>
      {RANGES.map(r => (
        <button key={r} style={btn(activeRange === r)} onClick={() => { setActiveRange(r); onSetRange(r); }}>
          {r.toUpperCase()}
        </button>
      ))}

      <div style={divider} />
      <span style={label}>Dataset</span>
      {DATASETS.map(d => (
        <button key={d} style={btn(datasets[d])} onClick={() => onToggleDataset(d)}>
          {d}
        </button>
      ))}

      <div style={divider} />
      <span style={{ fontSize: '10px', color: 'var(--dim)', marginLeft: 'auto' }}>
        {lastUpdate ? `Updated ${lastUpdate}` : '—'}
      </span>
    </div>
  );
};

export default Controls;