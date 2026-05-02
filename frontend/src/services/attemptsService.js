// All HTTP calls to /api/attempts on the Spring Boot backend.

const BASE_URL = 'http://localhost:8080/api/attempts';

const handleResponse = async (res) => {
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${msg}`);
  }
  return res.json();
};

const buildQuery = (params = {}) => {
  const qs = Object.entries(params)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return qs ? `?${qs}` : '';
};

export const fetchAttempts = ({ name, team, nation, position } = {}) => {
  const query = buildQuery({ name, team, nation, position });
  return fetch(`${BASE_URL}${query}`).then(handleResponse);
};

export const addAttemptsPlayer = (data) =>
  fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  }).then(handleResponse);

export const updateAttemptsPlayer = (data) =>
  fetch(BASE_URL, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  }).then(handleResponse);

export const deleteAttemptsPlayer = (playerName) =>
  fetch(`${BASE_URL}/${encodeURIComponent(playerName)}`, {
    method: 'DELETE',
  }).then(handleResponse);
