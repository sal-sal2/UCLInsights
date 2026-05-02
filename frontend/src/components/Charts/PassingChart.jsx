import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { getTopN } from '../../utils/statsHelpers';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__name">{d.playerName}</div>
      <div className="chart-tooltip__team">{d.team}</div>
      <div className="chart-tooltip__stat">
        <span style={{ color: 'var(--color-accent)' }}>{d.passAccuracy}%</span> accuracy
      </div>
      <div className="chart-tooltip__stat">
        <span style={{ color: 'var(--color-primary)' }}>{d.passesCompleted}</span> / {d.passesAttempted} passes
      </div>
    </div>
  );
};

export default function PassingChart({ players = [], limit = 10 }) {
  const data = getTopN(players, 'passesCompleted', limit).map((p) => ({
    ...p,
    label: p.playerName?.split(' ').at(-1) ?? p.playerName,
  }));

  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Top Passers</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
            angle={-40} textAnchor="end" interval={0}
          />
          <YAxis
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,229,255,0.07)' }} />
          <Bar dataKey="passesCompleted" name="Passes Completed" radius={[4,4,0,0]} maxBarSize={40}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--color-accent)" opacity={1 - i * 0.05} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
