import useDefending from '../../hooks/useDefending';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import TopScorersChart from '../../components/Charts/TopScorersChart';

const CAT = STAT_CATEGORIES['defending'];

export default function Defending() {
  const { data, loading, error } = useDefending();

  return (
    <StatPage
      title="Defending Statistics"
      subtitle="UEFA Champions League · Tackles, clearances, and recoveries"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="tacklesTotal"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Total Tackles', valueKey: 'tacklesTotal', accent: 'blue', sub: '' },
        { label: 'Balls Recovered', valueKey: 'ballsRecovered', accent: 'cyan', sub: '' },
        { label: 'Clearances', valueKey: 'clearances', accent: 'gold', sub: '' },
      ]}
      charts={[
        <TopScorersChart players={data} limit={10} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="tacklesTotal"
    />
  );
}
