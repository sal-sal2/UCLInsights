import { useState, useMemo } from 'react';
import { shortPosition, flagEmoji } from '../../utils/formatters';
import './PlayerTable.css';


export default function PlayerTable({
  players    = [],
  columns    = [],
  primaryKey,
  loading,
  onRowClick,
}) {
  const pk = primaryKey ?? columns[0]?.key ?? 'goals';

  const [sortKey, setSortKey] = useState(pk);
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = useMemo(() => {
    return [...players].sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      if (typeof av === 'number' && typeof bv === 'number')
        return sortDir === 'desc' ? bv - av : av - bv;
      return sortDir === 'desc'
        ? String(bv).localeCompare(String(av))
        : String(av).localeCompare(String(bv));
    });
  }, [players, sortKey, sortDir]);

  if (loading) {
    return (
      <div className="player-table__loading">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="skeleton player-table__row-skeleton" />
        ))}
      </div>
    );
  }

  if (!players.length) {
    return (
      <div className="player-table__empty">
        No players match the current filters.
      </div>
    );
  }

  return (
    <div className="player-table__wrap">
      <table className="player-table">
        <thead>
          <tr>
            <th className="player-table__th">#</th>
            <th className="player-table__th player-table__th--sortable"
                onClick={() => handleSort('playerName')}>
              Player {sortKey === 'playerName' && (sortDir === 'desc' ? '↓' : '↑')}
            </th>
            <th className="player-table__th player-table__th--sortable"
                onClick={() => handleSort('team')}>
              Team {sortKey === 'team' && (sortDir === 'desc' ? '↓' : '↑')}
            </th>
            <th className="player-table__th">Pos</th>
            <th className="player-table__th">Nat</th>

            {columns.map(({ key, label, title }) => (
              <th
                key={key}
                title={title}
                className={`player-table__th player-table__th--sortable ${sortKey === key ? 'player-table__th--active' : ''}`}
                onClick={() => handleSort(key)}
              >
                {label}
                {sortKey === key && (
                  <span className="player-table__sort-icon">
                    {sortDir === 'desc' ? ' ↓' : ' ↑'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((player, i) => (
            <tr
              key={player.id}
              className="player-table__row"
              onClick={() => onRowClick?.(player)}
            >
              <td className="player-table__td player-table__td--rank">
                {i < 3 ? (
                  <span className={`player-table__medal player-table__medal--${i + 1}`}>{i + 1}</span>
                ) : (
                  <span className="player-table__rank-num">{i + 1}</span>
                )}
              </td>
              <td className="player-table__td player-table__td--name">
                {player.playerName}
              </td>
              <td className="player-table__td">{player.team}</td>
              <td className="player-table__td">
                <span className="badge badge--muted">{shortPosition(player.position)}</span>
              </td>
              <td className="player-table__td player-table__td--nation">
                <span title={player.nation}>
                  {flagEmoji(player.nation)} {player.nation}
                </span>
              </td>
              {columns.map(({ key }) => (
                <td
                  key={key}
                  className={`player-table__td ${key === pk ? 'player-table__td--primary' : ''}`}
                >
                  {player[key] ?? 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
