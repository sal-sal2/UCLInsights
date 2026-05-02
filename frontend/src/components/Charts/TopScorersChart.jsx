import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { getTopScorers } from '../../utils/statsHelpers';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__name">{d.playerName}</div>
      <div className="chart-tooltip__team">{d.team}</div>
      <div className="chart-tooltip__stat">
        <span style={{ color: 'var(--color-primary)' }}>{d.goals}</span> goals
      </div>
    </div>
  );
};

export default function TopScorersChart({ players = [], limit = 10 }) {
  const data = getTopScorers(players, limit).map((p) => ({
    ...p,
    label: p.playerName?.split(' ').at(-1) ?? p.playerName,
  }));

  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Top Scorers</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 40 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={false}
            tickLine={false}
            angle={-40}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(29,111,255,0.07)' }} />
          <Bar dataKey="goals" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? 'var(--color-gold)' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'var(--color-primary)'}
                opacity={1 - i * 0.04}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}