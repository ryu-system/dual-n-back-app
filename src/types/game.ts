export interface Position {
  row: number;
  col: number;
}

export interface Trial {
  position: Position;
  letter: string;
  timestamp: number;
}

export interface GameConfig {
  nLevel: number;
  trialDuration: number;
  totalTrials: number;
  soundEnabled: boolean;
}

export interface GameResult {
  visualCorrect: number;
  visualIncorrect: number;
  audioCorrect: number;
  audioIncorrect: number;
  accuracy: number;
  nLevel: number;
  date: Date;
}

export interface GameState {
  isRunning: boolean;
  currentTrialIndex: number;
  trials: Trial[];
  userInputs: {
    visual: boolean[];
    audio: boolean[];
  };
  showFeedback: boolean;
  feedbackType: 'correct' | 'incorrect' | null;
}

export const GRID_SIZE = 3;
export const LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];
export const DEFAULT_CONFIG: GameConfig = {
  nLevel: 2,
  trialDuration: 2500,
  totalTrials: 20,
  soundEnabled: false,
};