import useDistribution from '../../hooks/useDistribution';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import PassingChart from '../../components/Charts/PassingChart';
import TopScorersChart from '../../components/Charts/TopScorersChart';

const CAT = STAT_CATEGORIES['distribution'];

export default function Distribution() {
  const { data, loading, error } = useDistribution();

  return (
    <StatPage
      title="Distribution Statistics"
      subtitle="UEFA Champions League · Passing and crossing records"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="passesCompleted"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Passes Completed', valueKey: 'passesCompleted', accent: 'blue', sub: '' },
        { label: 'Crosses', valueKey: 'crossesCompleted', accent: 'cyan', sub: '' },
        { label: 'Free Kicks', valueKey: 'freeKicks', accent: 'gold', sub: '' },
      ]}
      charts={[
        <PassingChart    players={data} />,
        <TopScorersChart players={data} limit={8} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="passesCompleted"
    />
  );
}
