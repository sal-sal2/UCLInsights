import useDisciplinary from '../../hooks/useDisciplinary';
import { STAT_CATEGORIES } from '../../constants/theme';
import StatPage from '../../components/StatPage/StatPage';
import DisciplinaryChart from '../../components/Charts/DisciplinaryChart';
import TopScorersChart from '../../components/Charts/TopScorersChart';

const CAT = STAT_CATEGORIES['disciplinary'];

export default function Disciplinary() {
  const { data, loading, error } = useDisciplinary();

  return (
    <StatPage
      title="Disciplinary Statistics"
      subtitle="UEFA Champions League · Cards, fouls, and minutes played"
      data={data}
      loading={loading}
      error={error}
      columns={CAT.columns}
      primaryKey="foulsCommitted"
      statCards={[
        { label: 'Players', valueKey: '_count', accent: 'muted', sub: '' },
        { label: 'Fouls Committed', valueKey: 'foulsCommitted', accent: 'blue', sub: '' },
        { label: 'Yellow Cards', valueKey: 'yellowCards', accent: 'gold', sub: '' },
        { label: 'Red Cards', valueKey: 'redCards', accent: 'cyan', sub: '' },
      ]}
      charts={[
        <DisciplinaryChart players={data} />,
        <TopScorersChart   players={data} limit={8} />,
      ]}
      showLeaderboard={true}
      leaderboardKey="foulsCommitted"
    />
  );
}
