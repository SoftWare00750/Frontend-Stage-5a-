import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { COMMON_CHART_OPTS } from './data';

Chart.register(...registerables);

const LiveTag = () => (
  <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', padding: '2px 7px', borderRadius: '2px', background: 'rgba(59,130,246,0.15)', color: 'var(--accent2)', border: '1px solid rgba(59,130,246,0.25)', letterSpacing: '0.5px' }}>
    LIVE
  </span>
);

const ChartPanel: React.FC<{ title: React.ReactNode; right?: React.ReactNode; children: React.ReactNode }> = ({ title, right, children }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>{title}</div>
      {right}
    </div>
    <div style={{ padding: '16px' }}>{children}</div>
  </div>
);

// ---- LINE CHART ----
interface LineChartProps {
  labels: string[];
  cpuData: (number | null)[];
  memData: (number | null)[];
  netData: (number | null)[];
}

export const LineChart: React.FC<LineChartProps> = ({ labels, cpuData, memData, netData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'CPU',     data: [...cpuData],  borderColor: '#3b82f6', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.4 },
          { label: 'Memory',  data: [...memData],  borderColor: '#10b981', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.4 },
          { label: 'Network', data: [...netData],  borderColor: '#06b6d4', borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.4, borderDash: [4, 3] },
        ],
      },
      options: COMMON_CHART_OPTS as any,
    });
    return () => chartRef.current?.destroy();
  }, []); // eslint-disable-line

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.data.labels = labels;
    chart.data.datasets[0].data = [...cpuData];
    chart.data.datasets[1].data = [...memData];
    chart.data.datasets[2].data = [...netData];
    chart.update('none');
  }, [labels, cpuData, memData, netData]);

  return (
    <ChartPanel
      title={<>System Metrics <LiveTag /></>}
      right={
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ c: '#3b82f6', l: 'CPU' }, { c: '#10b981', l: 'Memory' }, { c: '#06b6d4', l: 'Net' }].map(({ c, l }) => (
            <span key={l} style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 8, height: 2, background: c, display: 'inline-block', borderRadius: 1 }} />
              <span style={{ color: 'var(--muted)' }}>{l}</span>
            </span>
          ))}
        </div>
      }
    >
      <div style={{ position: 'relative', height: 200 }}>
        <canvas ref={canvasRef} aria-label="Real-time system metrics line chart" role="img" />
      </div>
    </ChartPanel>
  );
};

// ---- BAR CHART ----
export const BarChart: React.FC<{ data: number[] }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 15 }, (_, i) => `-${14 - i}s`),
        datasets: [{ label: 'Requests', data: [...data], backgroundColor: 'rgba(139,92,246,0.55)', borderColor: '#8b5cf6', borderWidth: 1, borderRadius: 2 }],
      },
      options: { ...COMMON_CHART_OPTS, scales: { ...COMMON_CHART_OPTS.scales, y: { ...COMMON_CHART_OPTS.scales.y, max: undefined } } } as any,
    });
    return () => chartRef.current?.destroy();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data.datasets[0].data = [...data];
    chartRef.current.update('none');
  }, [data]);

  return (
    <ChartPanel title="Request Volume" right={<LiveTag />}>
      <div style={{ position: 'relative', height: 160 }}>
        <canvas ref={canvasRef} aria-label="Request volume bar chart" role="img" />
      </div>
    </ChartPanel>
  );
};

// ---- AREA CHART ----
export const AreaChart: React.FC<{ data: number[] }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `-${29 - i}s`),
        datasets: [{ label: 'Errors', data: [...data], borderColor: '#ef4444', borderWidth: 1.5, backgroundColor: 'rgba(239,68,68,0.12)', fill: true, tension: 0.4, pointRadius: 0 }],
      },
      options: { ...COMMON_CHART_OPTS, scales: { ...COMMON_CHART_OPTS.scales, y: { ...COMMON_CHART_OPTS.scales.y, max: 5 } } } as any,
    });
    return () => chartRef.current?.destroy();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data.datasets[0].data = [...data];
    chartRef.current.update('none');
  }, [data]);

  return (
    <ChartPanel title="Error Rate Area" right={<LiveTag />}>
      <div style={{ position: 'relative', height: 160 }}>
        <canvas ref={canvasRef} aria-label="Error rate area chart" role="img" />
      </div>
    </ChartPanel>
  );
};