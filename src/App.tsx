import { useState } from 'react';
import './App.css';

type CurrentView = 'start' | 'load' | 'new';

interface SavedSession {
  id: string;
  carName: string;
  trackName: string;
  savedDate: string;
}

const MOCK_SAVED_SESSIONS: SavedSession[] = [
  {
    id: 'session-1',
    carName: 'Porsche 911 GT3 R',
    trackName: 'Spa-Francorchamps',
    savedDate: '2026-05-12',
  },
  {
    id: 'session-2',
    carName: 'Ferrari 296 GT3',
    trackName: 'Circuit de la Sarthe',
    savedDate: '2026-05-08',
  },
  {
    id: 'session-3',
    carName: 'BMW M4 GT3',
    trackName: 'Silverstone',
    savedDate: '2026-04-30',
  },
  {
    id: 'session-4',
    carName: 'Aston Martin Vantage GT3',
    trackName: 'Monza',
    savedDate: '2026-04-21',
  },
];

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('start');

  function handleStartNewSession(): void {
    setCurrentView('new');
  }

  function handleOpenLoadSession(): void {
    setCurrentView('load');
  }

  function handleReturnToStart(): void {
    setCurrentView('start');
  }

  function handleResumeSession(session: SavedSession): void {
    setCurrentView('new');
    void session;
  }

  function renderStartPage() {
    return (
      <section className="view view-start" aria-label="Start Session">
        <header className="app-header">
          <p className="app-eyebrow">LucaVRE</p>
          <h1 className="app-title">Setup Assistant</h1>
          <p className="app-subtitle">
            Diagnose GT3 handling issues and dial in your car setup for Le Mans Ultimate.
          </p>
        </header>

        <div className="action-grid">
          <button
            type="button"
            className="action-card action-card-primary"
            onClick={handleStartNewSession}
          >
            <span className="action-card-icon" aria-hidden="true">
              +
            </span>
            <span className="action-card-label">New Session</span>
            <span className="action-card-hint">Start a fresh setup diagnosis</span>
          </button>

          <button
            type="button"
            className="action-card action-card-secondary"
            onClick={handleOpenLoadSession}
          >
            <span className="action-card-icon" aria-hidden="true">
              &#8635;
            </span>
            <span className="action-card-label">Load Session</span>
            <span className="action-card-hint">Resume a saved tuning session</span>
          </button>
        </div>
      </section>
    );
  }

  function renderLoadPage() {
    return (
      <section className="view view-load" aria-label="Load Session">
        <button type="button" className="back-button" onClick={handleReturnToStart}>
          <span aria-hidden="true">&#8592;</span> Back
        </button>

        <header className="view-header">
          <h2 className="view-title">Load Session</h2>
          <p className="view-subtitle">Pick up where you left off.</p>
        </header>

        <ul className="session-list">
          {MOCK_SAVED_SESSIONS.map((session) => (
            <li key={session.id} className="session-card">
              <div className="session-card-info">
                <p className="session-card-title">
                  {session.carName} @ {session.trackName}
                </p>
                <p className="session-card-date">{session.savedDate}</p>
              </div>
              <button
                type="button"
                className="session-card-resume"
                onClick={() => handleResumeSession(session)}
              >
                Resume
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  function renderNewPage() {
    return (
      <section className="view view-new" aria-label="New Session">
        <button type="button" className="back-button" onClick={handleReturnToStart}>
          <span aria-hidden="true">&#8592;</span> Back
        </button>

        <header className="view-header">
          <h2 className="view-title">New Session</h2>
          <p className="view-subtitle">Active tuning session in progress.</p>
        </header>

        <div className="session-detail-grid">
          <div className="detail-card">
            <p className="detail-card-label">Car</p>
            <p className="detail-card-value">Select a GT3 car to begin</p>
          </div>

          <div className="detail-card">
            <p className="detail-card-label">Track</p>
            <p className="detail-card-value">Select a track to begin</p>
          </div>

          <div className="detail-card detail-card-wide">
            <p className="detail-card-label">Reported Symptom</p>
            <p className="detail-card-value">
              e.g. &ldquo;Understeer on corner entry at Turn 5&rdquo;
            </p>
          </div>

          <div className="detail-card detail-card-wide">
            <p className="detail-card-label">Recommended Setup Changes</p>
            <p className="detail-card-value">
              Diagnosis will appear here once symptoms are submitted.
            </p>
          </div>
        </div>
      </section>
    );
  }

  function renderCurrentView() {
    switch (currentView) {
      case 'start':
        return renderStartPage();
      case 'load':
        return renderLoadPage();
      case 'new':
        return renderNewPage();
      default:
        return renderStartPage();
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">{renderCurrentView()}</div>
    </div>
  );
}

export default App;
