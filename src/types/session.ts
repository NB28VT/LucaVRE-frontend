export type CurrentView = 'start' | 'load' | 'new' | 'balance' | 'results';

export interface SavedSession {
  id: string;
  carName: string;
  trackName: string;
  savedDate: string;
}

// Matches WorkingSessionSerializer's `lower_camel` output in LucaVRE-api.
export interface WorkingSessionResponse {
  id: number;
  carId: string;
  trackId: string;
  createdAt: string;
}
