import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',             label: 'Home',         end: true },
  { to: '/goals',        label: 'Goals'         },
  { to: '/attempts',     label: 'Attempts'      },
  { to: '/attacking',    label: 'Attacking'     },
  { to: '/distribution', label: 'Distribution'  },
  { to: '/defending',    label: 'Defending'     },
  { to: '/disciplinary', label: 'Disciplinary'  },
];

export default function Navbar() {
  const [scrolled,  setScrolled ] = useState(false);
  const [menuOpen,  setMenuOpen ] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-icon">⬡</span>
          <span className="navbar__brand-text">
            UCL<span className="navbar__brand-accent">Insights</span>
          </span>
        </NavLink>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
