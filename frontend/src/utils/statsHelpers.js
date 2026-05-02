
export const goalsPerGame = (p) =>
  p.matchesPlayed > 0 ? (p.goals / p.matchesPlayed).toFixed(2) : '0.00';

export const penaltyRate = (p) =>
  p.goals > 0 ? ((p.penaltiesScored / p.goals) * 100).toFixed(1) : '0.0';

export const nonPenaltyGoals = (p) => (p.goals ?? 0) - (p.penaltiesScored ?? 0);


export const getTopN = (players, key, n = 10) =>
  [...players]
    .sort((a, b) => (b[key] ?? 0) - (a[key] ?? 0))
    .slice(0, n);

export const getTopScorers = (players, n = 10) => getTopN(players, 'goals', n);

export const getGoalsByTeam = (players) => {
  const map = {};
  players.forEach(({ team, goals }) => {
    if (!team) return;
    map[team] = (map[team] ?? 0) + (goals ?? 0);
  });
  return Object.entries(map)
    .map(([team, goals]) => ({ team, goals }))
    .sort((a, b) => b.goals - a.goals);
};

export const getGoalBreakdown = (players) => {
  const sum = (key) => players.reduce((acc, p) => acc + (p[key] ?? 0), 0);
  return [
    { label: 'Right Foot',   value: sum('goalsRightFoot'),   color: '#1d6fff' },
    { label: 'Left Foot',    value: sum('goalsLeftFoot'),    color: '#00e5ff' },
    { label: 'Header',       value: sum('goalsHead'),        color: '#f5c842' },
    { label: 'Inside Area',  value: sum('goalsInsideArea'),  color: '#22c55e' },
    { label: 'Outside Area', value: sum('goalsOutsideArea'), color: '#ef4444' },
    { label: 'Penalties',    value: sum('penaltiesScored'),  color: '#a78bfa' },
  ];
};


export const getAttemptsBreakdown = (players) => {
  const sum = (key) => players.reduce((acc, p) => acc + (p[key] ?? 0), 0);
  return [
    { label: 'On Target',  value: sum('attemptsOnTarget'),  color: '#22c55e' },
    { label: 'Off Target', value: sum('attemptsOffTarget'), color: '#ef4444' },
    { label: 'Blocked',    value: sum('attemptsBlocked'),   color: '#f5c842' },
  ];
};

export const shotAccuracy = (p) => {
  const total = p.attemptsTotal ?? 0;
  return total > 0
    ? ((p.attemptsOnTarget / total) * 100).toFixed(1)
    : '0.0';
};


export const getTopAssists = (players, n = 10) => getTopN(players, 'assists', n);


export const getTopPassers = (players, n = 10) =>
  getTopN(players, 'passesCompleted', n);


export const getTopDefenders = (players, n = 10) =>
  getTopN(players, 'tacklesTotal', n);

export const tackleSuccessRate = (p) => {
  const total = p.tacklesTotal ?? 0;
  return total > 0
    ? (((p.tacklesWon ?? 0) / total) * 100).toFixed(1)
    : '0.0';
};


export const totalCards = (p) => (p.yellowCards ?? 0) + (p.redCards ?? 0);


export const getUniqueTeams = (players) =>
  [...new Set(players.map((p) => p.team).filter(Boolean))].sort();

export const getUniquePositions = (players) =>
  [...new Set(players.map((p) => p.position).filter(Boolean))].sort();

export const getUniqueNations = (players) =>
  [...new Set(players.map((p) => p.nation).filter(Boolean))].sort();


export const getSummaryStats = (players) => ({
  totalPlayers: players.length,
  totalGoals:   players.reduce((s, p) => s + (p.goals ?? 0), 0),
  totalMatches: players.reduce((s, p) => s + (p.matchesPlayed ?? 0), 0),
  totalPens:    players.reduce((s, p) => s + (p.penaltiesScored ?? 0), 0),
  avgGoals:
    players.length > 0
      ? (players.reduce((s, p) => s + (p.goals ?? 0), 0) / players.length).toFixed(1)
      : '0.0',
});
