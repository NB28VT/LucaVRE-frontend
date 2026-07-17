import { useEffect, useState } from 'react';
import { MOCK_CARS, MOCK_TRACKS } from '@/data/mockVehicleData.ts';
import type { SavedSession, WorkingSessionResponse } from '@/types/session.ts';

interface LoadSessionPageProps {
  onBack: () => void;
  onResumeSession: (session: SavedSession) => void;
}

function toSavedSession(session: WorkingSessionResponse): SavedSession {
  const car = MOCK_CARS.find((candidate) => candidate.id === session.carId);
  const track = MOCK_TRACKS.find((candidate) => candidate.id === session.trackId);

  return {
    id: String(session.id),
    carName: car?.name ?? session.carId,
    trackName: track?.name ?? session.trackId,
    savedDate: new Date(session.createdAt).toLocaleDateString(),
  };
}

function LoadSessionPage({ onBack, onResumeSession }: LoadSessionPageProps) {
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSavedSessions() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch('/api/working_sessions', { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: WorkingSessionResponse[] = await response.json();
        setSavedSessions(data.map(toSavedSession));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setLoadError('Unable to load saved sessions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadSavedSessions();

    return () => controller.abort();
  }, []);

  return (
    <section className="view view-load" aria-label="Load Session">
      <button type="button" className="back-button" onClick={onBack}>
        <span aria-hidden="true">&#8592;</span> Back
      </button>

      <header className="view-header">
        <h2 className="view-title">Load Session</h2>
        <p className="view-subtitle">Pick up where you left off.</p>
      </header>

      {isLoading && <p className="view-subtitle">Loading saved sessions&hellip;</p>}

      {!isLoading && loadError && <p className="view-subtitle">{loadError}</p>}

      {!isLoading && !loadError && savedSessions.length === 0 && (
        <p className="view-subtitle">No saved sessions yet.</p>
      )}

      {!isLoading && !loadError && savedSessions.length > 0 && (
        <ul className="session-list">
          {savedSessions.map((session) => (
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
                onClick={() => onResumeSession(session)}
              >
                Resume
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default LoadSessionPage;
