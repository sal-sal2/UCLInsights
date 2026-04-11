import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
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
      {payload.map((p) => (
        <div key={p.name} className="chart-tooltip__stat">
          <span style={{ color: p.fill }}>{p.value}</span> {p.name}
        </div>
      ))}
    </div>
  );
};

export default function AttemptsChart({ players = [], limit = 10 }) {
  const data = getTopN(players, 'attemptsTotal', limit).map((p) => ({
    ...p,
    label: p.playerName?.split(' ').at(-1) ?? p.playerName,
  }));

  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Attempts Breakdown</h3>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(29,111,255,0.07)' }} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: 'var(--color-text-muted)', paddingTop: 8 }}
          />
          <Bar dataKey="attemptsOnTarget"  name="On Target"  fill="#22c55e" radius={[3,3,0,0]} maxBarSize={16} stackId="a" />
          <Bar dataKey="attemptsOffTarget" name="Off Target" fill="#ef4444" radius={[0,0,0,0]} maxBarSize={16} stackId="a" />
          <Bar dataKey="attemptsBlocked"   name="Blocked"    fill="#f5c842" radius={[3,3,0,0]} maxBarSize={16} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
