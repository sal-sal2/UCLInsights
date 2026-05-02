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
        <span style={{ color: '#f5c842' }}>{d.yellowCards ?? 0}</span> yellow
        {' · '}
        <span style={{ color: '#ef4444' }}>{d.redCards ?? 0}</span> red
      </div>
    </div>
  );
};

export default function DisciplinaryChart({ players = [], limit = 10 }) {
  const data = getTopN(players, 'foulsCommitted', limit).map((p) => ({
    ...p,
    label: p.playerName?.split(' ').at(-1) ?? p.playerName,
  }));

  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Most Fouls Committed</h3>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,200,66,0.07)' }} />
          <Bar dataKey="foulsCommitted" name="Fouls" radius={[4,4,0,0]} maxBarSize={40}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={(entry.redCards ?? 0) > 0 ? '#ef4444' : '#f5c842'}
                opacity={1 - i * 0.05}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
