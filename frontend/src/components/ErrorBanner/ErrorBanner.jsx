import './ErrorBanner.css';

export default function ErrorBanner({ message }) {
  return (
    <div className="error-banner" role="alert">
      <span className="error-banner__icon">⚠</span>
      <div>
        <strong>Could not load data</strong>
        <p>{message ?? 'Make sure Spring Boot is running on'} <code>localhost:8080</code></p>
      </div>
    </div>
  );
}
