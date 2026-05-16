import React from 'react';
import Header      from './Header';
import Controls    from './Controls';
import Ticker      from './Ticker';
import MetricCards from './MetricCards';
import { LineChart, BarChart, AreaChart } from './Charts';
import { Heatmap, GaugePanel }            from './Heatmap';
import { useStream }                      from './useStream';

// ── Severity colour map ───────────────────────────────────────────────────────
const SEV_COLOR: Record<string, string> = {
  ok:   'var(--green)',
  info: 'var(--accent)',
  warn: 'var(--amber)',
  crit: 'var(--red)',
};

// ── Event Feed ────────────────────────────────────────────────────────────────
const EventFeed: React.FC<{
  items: { id: number; msg: string; sev: string; ts: string }[];
  filter: string;
  onFilter: (v: string) => void;
}> = ({ items, filter, onFilter }) => {
  const visible = filter ? items.filter(e => e.sev === filter) : items;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

      {/* Section header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg2)', flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--display)', fontSize: '12px', fontWeight: 600,
          color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          Event Feed
        </span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '10px', padding: '1px 6px',
          borderRadius: '10px', background: 'var(--surface2)', color: 'var(--muted)',
        }}>
          {visible.length}
        </span>
      </div>

      {/* Severity filter chips */}
      <div style={{
        display: 'flex', gap: '6px', padding: '8px 12px',
        borderBottom: '1px solid var(--border)', background: 'var(--bg2)',
        flexWrap: 'wrap', flexShrink: 0,
      }}>
        {(['', 'ok', 'info', 'warn', 'crit'] as const).map(f => (
          <button
            key={f || 'all'}
            onClick={() => onFilter(f)}
            style={{
              padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
              fontFamily: 'var(--mono)', cursor: 'pointer', transition: 'all 0.15s',
              border: `1px solid ${filter === f
                ? (SEV_COLOR[f] ?? 'var(--accent)')
                : 'var(--border)'}`,
              background: filter === f
                ? `${SEV_COLOR[f] ?? 'var(--accent)'}22`
                : 'transparent',
              color: filter === f
                ? (SEV_COLOR[f] ?? 'var(--accent)')
                : 'var(--dim)',
            }}
          >
            {f || 'all'}
          </button>
        ))}
      </div>

      {/* Scrollable list */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {visible.slice(0, 80).map(e => (
          <div
            key={e.id}
            style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr auto',
              gap: '8px', padding: '7px 14px',
              borderBottom: '1px solid rgba(99,120,180,0.06)',
              alignItems: 'start', fontSize: '11px',
              transition: 'background 0.1s',
              animation: 'slide-in 0.2s ease',
            }}
            onMouseEnter={ev => (ev.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}
          >
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              marginTop: 3, flexShrink: 0,
              background: SEV_COLOR[e.sev] ?? 'var(--muted)',
            }} />
            <div style={{ color: 'var(--text)', lineHeight: 1.4, wordBreak: 'break-word' }}>
              {e.msg}
            </div>
            <div style={{ color: 'var(--dim)', whiteSpace: 'nowrap', fontSize: '10px' }}>
              {e.ts}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Asset Tracker ─────────────────────────────────────────────────────────────
const AssetTracker: React.FC<{
  assets: { sym: string; price: number; base: number; vol: string }[];
}> = ({ assets }) => (
  <div style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
    <div style={{
      padding: '12px 16px', borderBottom: '1px solid var(--border)',
      fontFamily: 'var(--display)', fontSize: '12px', fontWeight: 600,
      color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px',
      background: 'var(--bg2)',
    }}>
      Asset Tracker
    </div>

    {assets.map(a => {
      const chg = ((a.price - a.base) / a.base) * 100;
      const up  = chg >= 0;
      return (
        <div
          key={a.sym}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 14px',
            borderBottom: '1px solid rgba(99,120,180,0.06)',
            fontSize: '11px', transition: 'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div>
            <div style={{
              fontFamily: 'var(--display)', fontWeight: 700,
              fontSize: '12px', color: 'var(--text)',
            }}>
              {a.sym}
            </div>
            <div style={{ color: 'var(--dim)', fontSize: '10px', marginTop: 1 }}>
              Vol {a.vol}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 700, color: 'var(--text)' }}>
              {a.price < 10
                ? a.price.toFixed(3)
                : a.price < 100
                ? a.price.toFixed(2)
                : a.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div style={{ color: up ? 'var(--green)' : 'var(--red)', fontSize: '10px', marginTop: 1 }}>
              {up ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}%
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// ── Error Toast ───────────────────────────────────────────────────────────────
const ErrorToast: React.FC<{ msg: string | null }> = ({ msg }) => (
  <div style={{
    position: 'fixed', top: '90px', left: '50%',
    transform: 'translateX(-50%)',
    background: '#1a0a0a',
    border: '1px solid rgba(239,68,68,0.4)',
    borderRadius: '6px', padding: '10px 20px',
    fontSize: '12px', color: 'var(--red)',
    zIndex: 200,
    display: 'flex', alignItems: 'center', gap: '10px',
    boxShadow: '0 4px 20px rgba(239,68,68,0.2)',
    opacity: msg ? 1 : 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s',
    fontFamily: 'var(--mono)',
  }}>
    ⚠ {msg}
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const {
    state,
    toggleStream,
    setRange,
    toggleDataset,
    setFeedFilter,
    simulateError,
  } = useStream();

  const {
    streaming, latency, lastUpdate,
    datasets,
    metrics, prevMetrics,
    cpu, mem, net,
    lineLabels, cpuData, memData, netData,
    barData, areaData,
    heatmap,
    assets,
    feedItems, feedFilter,
    services,
    errorMsg,
  } = state;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Error toast ── */}
      <ErrorToast msg={errorMsg} />

      {/* ── Sticky header ── */}
      <Header
        streaming={streaming}
        latency={latency}
        onToggleStream={toggleStream}
        onSimulateError={simulateError}
      />

      {/* ── Scrolling asset ticker ── */}
      <Ticker assets={assets} />

      {/* ── Toolbar: range + dataset toggles ── */}
      <Controls
        datasets={datasets}
        lastUpdate={lastUpdate}
        onSetRange={setRange}
        onToggleDataset={toggleDataset}
      />

      {/* ── Two-column main layout ── */}
      <div
        className="main-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          minHeight: 'calc(100vh - 97px)',
        }}
      >
        {/* ─── Left column: charts ─────────────────────────────────── */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
        }}>

          {/* KPI metric cards */}
          <MetricCards metrics={metrics} prevMetrics={prevMetrics} />

          {/* Rolling system-resource line chart */}
          <LineChart
            labels={lineLabels}
            cpuData={cpuData}
            memData={memData}
            netData={netData}
          />

          {/* Side-by-side bar + area charts */}
          <div
            className="chart-row"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          >
            <BarChart  data={barData}  />
            <AreaChart data={areaData} />
          </div>

          {/* Circular gauges + network service bars */}
          <GaugePanel cpu={cpu} mem={mem} net={net} services={services} />

          {/* 12×12 request-density heatmap */}
          <Heatmap data={heatmap} />
        </div>

        {/* ─── Right column: sidebar ───────────────────────────────── */}
        <div
          className="sidebar"
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Live asset prices */}
          <AssetTracker assets={assets} />

          {/* Filterable event stream */}
          <EventFeed
            items={feedItems}
            filter={feedFilter}
            onFilter={setFeedFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default App;