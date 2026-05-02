import './StatCard.css';


export default function StatCard({ label, value, sub, accent = 'blue', loading }) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-card__label">{label}</div>
      {loading ? (
        <div className="skeleton stat-card__skeleton" />
      ) : (
        <div className="stat-card__value">{value}</div>
      )}
      {sub && <div className="stat-card__sub">{sub}</div>}
      <div className="stat-card__bar" />
    </div>
  );
}