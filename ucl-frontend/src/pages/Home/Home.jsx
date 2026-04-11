import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useGoals from '../../hooks/useGoals';
import { getSummaryStats, getTopScorers } from '../../utils/statsHelpers';
import { STAT_CATEGORIES } from '../../constants/theme';
import './Home.css';

const HIGHLIGHTS = [
  { key: 'totalGoals',   label: 'Goals Tracked'    },
  { key: 'totalPlayers', label: 'Players'           },
  { key: 'totalMatches', label: 'Matches Analysed'  },
  { key: 'totalPens',    label: 'Penalties Scored'  },
];

const FEATURES = Object.values(STAT_CATEGORIES).map((cat) => ({
  icon:  cat.icon,
  title: cat.label,
  route: cat.route,
  desc:  {
    goals:        'Full goal breakdown — right foot, left foot, header, penalty, and area stats.',
    attempts:     'Total shots and how they were split: on target, off target, and blocked.',
    attacking:    'Assists, dribbles completed, corners taken, and offside counts.',
    distribution: 'Passing accuracy, volume, crossing stats, and free kick totals.',
    defending:    'Tackles, clearances, and balls recovered across the tournament.',
    disciplinary: 'Yellow cards, red cards, fouls committed, fouls suffered, and minutes played.',
  }[cat.api] ?? '',
}));

export default function Home() {
  const { data: players, loading } = useGoals();
  const stats    = getSummaryStats(players);
  const topThree = getTopScorers(players, 3);
  const heroRef  = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const x = ((e.clientX / window.innerWidth)  - 0.5) * 24;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 24;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-bg">
          <div className="home__orb home__orb--blue" ref={heroRef} />
          <div className="home__orb home__orb--cyan" />
          <div className="home__grid-lines" />
        </div>

        <div className="container home__hero-content">
          <div className="home__eyebrow">
            <span className="badge badge--blue">2025 / 26 Season</span>
          </div>

          <h1 className="home__title">
            UEFA Champions<br />
            <span className="home__title-accent">League</span> Analytics
          </h1>

          <p className="home__subtitle">
            Deep-dive statistics for every player in UEFA Champions League.
            Goals, attempts, passing, defending, and disciplinary records — all in one place.
          </p>

          <div className="home__actions">
            <Link to="/goals" className="home__btn-primary">
              Explore Stats →
            </Link>
            <a href="#highlights" className="home__btn-secondary">
              See the Data
            </a>
          </div>

          {!loading && topThree.length > 0 && (
            <div className="home__podium">
              {topThree.map((p, i) => (
                <div key={p.id} className={`home__podium-card home__podium-card--${i + 1}`}>
                  <span className="home__podium-rank">#{i + 1}</span>
                  <span className="home__podium-name">{p.playerName}</span>
                  <span className="home__podium-team">{p.team}</span>
                  <span className="home__podium-goals">{p.goals}<small>G</small></span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="highlights" className="home__highlights">
        <div className="container">
          <div className="home__highlights-grid">
            {HIGHLIGHTS.map(({ key, label }) => (
              <div key={key} className="home__stat-block">
                <span className="home__stat-value">
                  {loading
                    ? <span className="skeleton" style={{ width: 60, height: 40, display: 'inline-block' }} />
                    : stats[key]
                  }
                </span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="container">
          <h2 className="home__section-title">Explore by Category</h2>
          <div className="home__feature-grid">
            {FEATURES.map((f) => (
              <Link key={f.route} to={f.route} className="home__feature-card card">
                <span className="home__feature-icon">{f.icon}</span>
                <h3 className="home__feature-title">{f.title}</h3>
                <p className="home__feature-desc">{f.desc}</p>
                <span className="home__feature-link">View {f.title} →</span>
              </Link>
            ))}
          </div>

          <div className="home__cta-banner card">
            <div>
              <h3>Ready to explore the data?</h3>
              <p>Full player roster with sortable stats, visual charts, and filters.</p>
            </div>
            <Link to="/goals" className="home__btn-primary">
              Open Player Dashboard →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
