import { useEffect, useRef } from 'react';
import './FilterBar.css';


export default function FilterBar({
  filters,
  onChange,
  teams     = [],
  positions = [],
  nations   = [],
  resultCount,
}) {
  const searchRef = useRef(null);

  useEffect(() => { searchRef.current?.focus(); }, []);

  const hasActiveFilters =
    filters.search || filters.team || filters.position || filters.nation;

  const clearAll = () => {
    onChange('search',   '');
    onChange('team',     '');
    onChange('position', '');
    onChange('nation',   '');
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__top">
        <div className="filter-bar__search-wrap">
          <span className="filter-bar__search-icon">⌕</span>
          <input
            ref={searchRef}
            type="text"
            className="filter-bar__search"
            placeholder="Search player name…"
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
          />
          {filters.search && (
            <button
              className="filter-bar__clear-icon"
              onClick={() => onChange('search', '')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <Select
          label="Team"
          value={filters.team}
          options={teams}
          onChange={(v) => onChange('team', v)}
          placeholder="All Teams"
        />
        <Select
          label="Position"
          value={filters.position}
          options={positions}
          onChange={(v) => onChange('position', v)}
          placeholder="All Positions"
        />
        <Select
          label="Nation"
          value={filters.nation}
          options={nations}
          onChange={(v) => onChange('nation', v)}
          placeholder="All Nations"
        />
      </div>

      <div className="filter-bar__status">
        <span className="filter-bar__count">
          <strong>{resultCount}</strong> player{resultCount !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button className="filter-bar__clear-all" onClick={clearAll}>
            Clear filters ×
          </button>
        )}
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange, placeholder }) {
  return (
    <div className="filter-bar__select-wrap">
      <select
        className="filter-bar__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="filter-bar__select-arrow">▾</span>
    </div>
  );
}