import React from 'react';
import { ERROR_MESSAGES } from './data';

interface HeaderProps {
  streaming: boolean;
  latency: number;
  onToggleStream: () => void;
  onSimulateError: (msgs: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ streaming, latency, onToggleStream, onSimulateError }) => {
  const btnStyle = (variant?: string): React.CSSProperties => ({
    padding: '6px 14px',
    border: `1px solid ${variant === 'danger' ? 'rgba(239,68,68,0.4)' : 'var(--border2)'}`,
    borderRadius: '4px',
    background: 'var(--surface)',
    color: variant === 'danger' ? 'var(--red)' : (variant === 'success' ? 'var(--green)' : 'var(--text)'),
    fontFamily: 'var(--mono)',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    letterSpacing: '0.3px',
  });

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
        NexusFlow
        <span style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'var(--mono)', fontWeight: 400, marginLeft: 4 }}>/ analytics</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', border: '1px solid var(--border2)', borderRadius: '4px', fontSize: '11px', color: 'var(--muted)', background: 'var(--surface)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: streaming ? 'var(--green)' : 'var(--amber)', animation: streaming ? 'blink 1.4s step-end infinite' : 'none' }} />
          {streaming ? 'LIVE' : 'PAUSED'}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', border: '1px solid var(--border2)', borderRadius: '4px', fontSize: '11px', color: 'var(--muted)', background: 'var(--surface)' }}>
          ~{latency}ms latency
        </div>

        <button onClick={onToggleStream} style={btnStyle(streaming ? undefined : 'success')}>
          {streaming ? '⏸ Pause' : '▶ Resume'}
        </button>

        <button onClick={() => onSimulateError(ERROR_MESSAGES)} style={btnStyle('danger')}>
          ⚡ Inject Error
        </button>
      </div>
    </header>
  );
};

export default Header;