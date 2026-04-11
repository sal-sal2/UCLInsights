import { useMemo } from 'react';
import { goalsPerGame, nonPenaltyGoals } from '../../utils/statsHelpers';
import './Leaderboard.css';

const MEDALS = ['1st', '2nd', '3rd'];

export default function Leaderboard({ players = [], limit = 5, loading, sortKey = 'goals', valueLabel }) {
  const label = valueLabel ?? sortKey;
  const isGoalsMode = sortKey === 'goals';

  const top = useMemo(() =>
    [...players].sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0)).slice(0, limit),
    [players, sortKey, limit]
  );

  return (
    <div className="leaderboard card">
      <h3 className="leaderboard__title">Top by {label.replace(/([A-Z])/g, ' $1').trim()}</h3>
      {loading ? (
        <div className="leaderboard__skeletons">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="skeleton leaderboard__skeleton" />
          ))}
        </div>
      ) : (
        <ol className="leaderboard__list">
          {top.map((player, i) => (
            <li key={player.id ?? i} className="leaderboard__item">
              <span className="leaderboard__rank">
                {i < 3 ? MEDALS[i] : <span className="leaderboard__rank-num">{i + 1}</span>}
              </span>
              <div className="leaderboard__info">
                <span className="leaderboard__name">{player.playerName}</span>
                <span className="leaderboard__meta">
                  {player.team}
                  {isGoalsMode && (
                    <>
                      <span className="leaderboard__dot" />
                      {goalsPerGame(player)} G/game
                      <span className="leaderboard__dot" />
                      {nonPenaltyGoals(player)} npG
                    </>
                  )}
                </span>
              </div>
              <span className="leaderboard__goals">{player[sortKey] ?? 0}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
