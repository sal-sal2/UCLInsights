import useGoals from '../../hooks/useGoals';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import TopScorersChart from '../../components/Charts/TopScorersChart';
import GoalBreakdownChart from '../../components/Charts/GoalBreakdownChart';

const CAT = STAT_CATEGORIES['goals'];

export default function Goals() {
  const { data, loading, error } = useGoals();

  return (
    <StatPage
      title="Goal Statistics"
      subtitle="UEFA Champions League · Goal scoring records"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="goals"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Total Goals', valueKey: 'goals', accent: 'blue', sub: '' },
        { label: 'Penalties', valueKey: 'penaltiesScored', accent: 'gold', sub: '' },
        { label: 'Inside Area', valueKey: 'goalsInsideArea', accent: 'cyan', sub: '' },
      ]}
      charts={[
        <TopScorersChart    players={data} />,
        <GoalBreakdownChart players={data} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="goals"
    />
  );
}
