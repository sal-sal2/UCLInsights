
export const fmt = (v, decimals = 0) => {
  if (v == null) return '—';
  return typeof v === 'number' ? v.toFixed(decimals) : v;
};

export const pct = (v) => (v != null ? `${Number(v).toFixed(1)}%` : '—');


export const flagEmoji = (code) => {
  if (!code || code.length !== 3) return '';
  const MAP = {
    ENG: 'GB', SCO: 'GB', WAL: 'GB', NIR: 'GB',
    GER: 'DE', FRA: 'FR', ESP: 'ES', ITA: 'IT',
    POR: 'PT', NED: 'NL', BEL: 'BE', SUI: 'CH',
    AUT: 'AT', DEN: 'DK', NOR: 'NO', SWE: 'SE',
    CRO: 'HR', SRB: 'RS', POL: 'PL', CZE: 'CZ',
    SVK: 'SK', HUN: 'HU', ROU: 'RO', BUL: 'BG',
    GRE: 'GR', TUR: 'TR', RUS: 'RU', UKR: 'UA',
    BRA: 'BR', ARG: 'AR', URU: 'UY', COL: 'CO',
    MEX: 'MX', USA: 'US', CAN: 'CA', JAM: 'JM',
    CMR: 'CM', NGA: 'NG', SEN: 'SN', CIV: 'CI',
    GHA: 'GH', EGY: 'EG', MAR: 'MA', ALG: 'DZ',
    JPN: 'JP', KOR: 'KR', IRN: 'IR', AUS: 'AU',
  };
  const iso2 = MAP[code.toUpperCase()] ?? code.slice(0, 2);
  return iso2
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
};


export const shortPosition = (pos) => {
  const MAP = {
    STRIKER:                  'ST',
    FORWARD:                  'FW',
    ATTACKING_MIDFIELDER:     'AM',
    CENTRAL_MIDFIELDER:       'CM',
    MIDFIELDER:               'MF',
    FULL_BACK:                'FB',
    CENTRE_BACK:              'CB',
    DEFENDER:                 'DF',
    GOALKEEPER:               'GK',
    UNKNOWN:                  '?',
  };
  return MAP[pos] ?? pos ?? '?';
};
