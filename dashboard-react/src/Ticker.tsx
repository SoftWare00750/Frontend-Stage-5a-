import React from 'react';
import { Asset } from './data';

interface TickerProps { assets: Asset[]; }

const Ticker: React.FC<TickerProps> = ({ assets }) => {
  const items = assets.map(a => {
    const chg = ((a.price - a.base) / a.base) * 100;
    const up = chg >= 0;
    return (
      <span key={a.sym} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
        <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{a.sym}</span>
        <span style={{ color: 'var(--text)' }}>
          {a.price < 100 ? a.price.toFixed(2) : a.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
        <span style={{ color: up ? 'var(--green)' : 'var(--red)' }}>
          {up ? '+' : ''}{chg.toFixed(2)}%
        </span>
      </span>
    );
  });

  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', padding: '7px 0', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', gap: '28px', animation: 'scroll-left 40s linear infinite' }}>
        {doubled}
      </div>
    </div>
  );
};

export default Ticker;