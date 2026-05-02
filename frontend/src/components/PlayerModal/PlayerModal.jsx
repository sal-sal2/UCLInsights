import { useEffect } from 'react';
import { goalsPerGame, penaltyRate, nonPenaltyGoals } from '../../utils/statsHelpers';
import './PlayerModal.css';


export default function PlayerModal({ player, onClose }) {
  useEffect(() => {
    if (!player) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [player, onClose]);

  useEffect(() => {
    if (player) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [player]);

  if (!player) return null;

  const gpg         = goalsPerGame(player);
  const penRate     = penaltyRate(player);
  const npGoals     = nonPenaltyGoals(player);
  const totalFoot   = (player.goalsRightFoot ?? 0) + (player.goalsLeftFoot ?? 0);
  const rfPct       = totalFoot > 0
    ? Math.round(((player.goalsRightFoot ?? 0) / totalFoot) * 100)
    : 0;

  const breakdown = [
    { label: 'Right Foot',   value: player.goalsRightFoot  ?? 0, color: 'var(--color-primary)' },
    { label: 'Left Foot',    value: player.goalsLeftFoot   ?? 0, color: 'var(--color-accent)'  },
    { label: 'Header',       value: player.goalsHead       ?? 0, color: 'var(--color-gold)'    },
    { label: 'Other',        value: player.goalsOther      ?? 0, color: '#a78bfa'              },
    { label: 'Inside Area',  value: player.goalsInsideArea  ?? 0, color: 'var(--color-success)'},
    { label: 'Outside Area', value: player.goalsOutsideArea ?? 0, color: 'var(--color-danger)' },
    { label: 'Penalties',    value: player.penaltiesScored  ?? 0, color: '#fb923c'             },
  ];

  const maxBreakdown = Math.max(...breakdown.map((b) => b.value), 1);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${player.playerName} stats`}
    >
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__player-initial">
              {player.playerName?.[0] ?? '?'}
            </div>
            <div>
              <h2 className="modal__player-name">{player.playerName}</h2>
              <div className="modal__player-meta">
                <span className="badge badge--muted">{player.position}</span>
                <span className="modal__sep">·</span>
                <span>{player.team}</span>
                <span className="modal__sep">·</span>
                <span className="badge badge--cyan">{player.nation}</span>
              </div>
            </div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal__kpis">
          <KPI label="Goals"         value={player.goals ?? 0}  accent="blue" />
          <KPI label="np Goals"      value={npGoals}             accent="cyan" />
          <KPI label="G / Game"      value={gpg}                 accent="gold" />
          <KPI label="Penalty %"     value={`${penRate}%`}       accent="muted" />
          <KPI label="Matches"       value={player.matchesPlayed ?? 0} accent="muted" />
        </div>

        <div className="modal__section">
          <h3 className="modal__section-title">Goal Breakdown</h3>
          <div className="modal__bars">
            {breakdown.map(({ label, value, color }) => (
              <div key={label} className="modal__bar-row">
                <span className="modal__bar-label">{label}</span>
                <div className="modal__bar-track">
                  <div
                    className="modal__bar-fill"
                    style={{
                      width: `${(value / maxBreakdown) * 100}%`,
                      background: color,
                    }}
                  />
                </div>
                <span className="modal__bar-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {totalFoot > 0 && (
          <div className="modal__section">
            <h3 className="modal__section-title">Foot Preference</h3>
            <div className="modal__foot-bar">
              <div
                className="modal__foot-fill modal__foot-fill--right"
                style={{ width: `${rfPct}%` }}
              >
                {rfPct > 15 && <span>R {rfPct}%</span>}
              </div>
              <div
                className="modal__foot-fill modal__foot-fill--left"
                style={{ width: `${100 - rfPct}%` }}
              >
                {100 - rfPct > 15 && <span>L {100 - rfPct}%</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KPI({ label, value, accent }) {
  const colorMap = {
    blue:  'var(--color-primary)',
    cyan:  'var(--color-accent)',
    gold:  'var(--color-gold)',
    muted: 'var(--color-text)',
  };
  return (
    <div className="modal__kpi">
      <span className="modal__kpi-label">{label}</span>
      <span className="modal__kpi-value" style={{ color: colorMap[accent] }}>
        {value}
      </span>
    </div>
  );
}