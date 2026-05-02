import { useState, useMemo } from 'react';
import StatCard    from '../StatCard/StatCard';
import FilterBar   from '../FilterBar/FilterBar';
import PlayerTable from '../PlayerTable/PlayerTable';
import PlayerModal from '../PlayerModal/PlayerModal';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import Leaderboard from '../Leaderboard/Leaderboard';
import {
  getUniqueTeams,
  getUniquePositions,
  getUniqueNations,
} from '../../utils/statsHelpers';
import './StatPage.css';


export default function StatPage({
  title,
  subtitle,
  badge     = '2025 / 26',
  data      = [],
  loading,
  error,
  columns   = [],
  primaryKey,
  statCards = [],
  charts    = [],
  showLeaderboard = false,
  leaderboardKey  = 'goals',
}) {
  const [filters,      setFilters     ] = useState({ search: '', team: '', position: '', nation: '' });
  const [activePlayer, setActivePlayer] = useState(null);

  const onChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const teams     = useMemo(() => getUniqueTeams(data),     [data]);
  const positions = useMemo(() => getUniquePositions(data), [data]);
  const nations   = useMemo(() => getUniqueNations(data),   [data]);

  const filtered = useMemo(() => {
    const { search, team, position, nation } = filters;
    return data.filter((p) => {
      if (search   && !p.playerName?.toLowerCase().includes(search.toLowerCase())) return false;
      if (team     && p.team     !== team)     return false;
      if (position && p.position !== position) return false;
      if (nation   && p.nation   !== nation)   return false;
      return true;
    });
  }, [data, filters]);

  const computeCardValue = (valueKey) => {
    if (typeof valueKey === 'function') return valueKey(filtered);
    if (valueKey === '_count') return filtered.length;
    return filtered.reduce((s, p) => s + (p[valueKey] ?? 0), 0);
  };

  return (
    <main className="stat-page">
      <div className="container">

        <header className="stat-page__header">
          <div>
            <h1 className="stat-page__title">{title}</h1>
            <p className="stat-page__subtitle">{subtitle}</p>
          </div>
          <span className="badge badge--blue">{badge}</span>
        </header>

        {error && <ErrorBanner message={error} />}

        {statCards.length > 0 && (
          <div className="stat-page__cards">
            {statCards.map(({ label, valueKey, accent, sub }) => (
              <StatCard
                key={label}
                label={label}
                value={loading ? '' : computeCardValue(valueKey)}
                accent={accent}
                sub={sub}
                loading={loading}
              />
            ))}
          </div>
        )}

        {charts.length > 0 && (
          <div className={`stat-page__viz-grid ${showLeaderboard ? 'stat-page__viz-grid--with-sidebar' : ''}`}>
            {charts.map((chart, i) => (
              <div key={i}>{chart}</div>
            ))}
            {showLeaderboard && (
              <Leaderboard
                players={filtered.length > 0 ? filtered : data}
                loading={loading}
                limit={6}
                sortKey={leaderboardKey}
              />
            )}
          </div>
        )}

        <section className="stat-page__table-section">
          <FilterBar
            filters={filters}
            onChange={onChange}
            teams={teams}
            positions={positions}
            nations={nations}
            resultCount={filtered.length}
          />
          <PlayerTable
            players={filtered}
            columns={columns}
            primaryKey={primaryKey}
            loading={loading}
            onRowClick={setActivePlayer}
          />
        </section>
      </div>

      <PlayerModal
        player={activePlayer}
        onClose={() => setActivePlayer(null)}
      />
    </main>
  );
}
