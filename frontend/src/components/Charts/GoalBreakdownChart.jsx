import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { getGoalBreakdown } from '../../utils/statsHelpers';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__name">{name}</div>
      <div className="chart-tooltip__stat">
        <span style={{ color: payload[0].payload.color }}>{value}</span> goals
      </div>
    </div>
  );
};

const renderLegend = ({ payload }) => (
  <ul className="chart-legend">
    {payload.map(({ value, color }) => (
      <li key={value} className="chart-legend__item">
        <span className="chart-legend__dot" style={{ background: color }} />
        <span>{value}</span>
      </li>
    ))}
  </ul>
);

export default function GoalBreakdownChart({ players = [] }) {
  const data = getGoalBreakdown(players).filter((d) => d.value > 0);

  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Goal Types</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius="52%"
            outerRadius="75%"
            paddingAngle={3}
            dataKey="value"
            nameKey="label"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={renderLegend}
            payload={data.map((d) => ({ value: d.label, color: d.color }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}