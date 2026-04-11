import useAttacking from '../../hooks/useAttacking';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import TopScorersChart from '../../components/Charts/TopScorersChart';

const CAT = STAT_CATEGORIES['attacking'];

export default function Attacking() {
  const { data, loading, error } = useAttacking();

  return (
    <StatPage
      title="Attacking Statistics"
      subtitle="UEFA Champions League · Assists, dribbles, and creativity"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="assists"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Assists', valueKey: 'assists', accent: 'blue', sub: '' },
        { label: 'Dribbles', valueKey: 'dribbles', accent: 'cyan', sub: '' },
        { label: 'Corners', valueKey: 'corners', accent: 'gold', sub: '' },
      ]}
      charts={[
        <TopScorersChart players={data} limit={10} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="assists"
    />
  );
}
