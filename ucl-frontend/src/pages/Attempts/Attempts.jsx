import useAttempts from '../../hooks/useAttempts';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import AttemptsChart from '../../components/Charts/AttemptsChart';
import TopScorersChart from '../../components/Charts/TopScorersChart';

const CAT = STAT_CATEGORIES['attempts'];

export default function Attempts() {
  const { data, loading, error } = useAttempts();

  return (
    <StatPage
      title="Attempts Statistics"
      subtitle="UEFA Champions League · Shot counts and accuracy"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="attemptsTotal"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Total Shots', valueKey: 'attemptsTotal', accent: 'blue', sub: '' },
        { label: 'On Target', valueKey: 'attemptsOnTarget', accent: 'cyan', sub: '' },
        { label: 'Blocked', valueKey: 'attemptsBlocked', accent: 'gold', sub: '' },
      ]}
      charts={[
        <AttemptsChart   players={data} />,
        <TopScorersChart players={data} limit={8} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="attemptsTotal"
    />
  );
}
