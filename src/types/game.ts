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
  gridSize: GridSize;
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

export const DEFAULT_GRID_SIZE = 3;
export const MIN_GRID_SIZE = 3;
export const MAX_GRID_SIZE = 5;
export const LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];
export const DEFAULT_CONFIG: GameConfig = {
  nLevel: 2,
  trialDuration: 2500,
  totalTrials: 20,
  soundEnabled: false,
  gridSize: DEFAULT_GRID_SIZE,
};

// Safe grid size validation function
export const validateGridSize = (size: number): GridSize => {
  if (size === 3 || size === 4 || size === 5) {
    return size as GridSize;
  }
  return DEFAULT_GRID_SIZE;
};

export type Theme = 'light' | 'dark' | 'custom';

export type GridSize = 3 | 4 | 5;

export interface GridConfig {
  cols: string;
  cellSize: string;
  gap: string;
}

export const GRID_CONFIGURATIONS: Record<GridSize, GridConfig> = {
  3: {
    cols: 'grid-cols-3',
    cellSize: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28',
    gap: 'gap-3 sm:gap-4 lg:gap-6'
  },
  4: {
    cols: 'grid-cols-4',
    cellSize: 'w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24',
    gap: 'gap-2 sm:gap-3 lg:gap-4'
  },
  5: {
    cols: 'grid-cols-5',
    cellSize: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20',
    gap: 'gap-2 sm:gap-2 lg:gap-3'
  }
};

export interface ThemeConfig {
  name: Theme;
  colors: {
    background: string;
    backgroundGradient: string;
    primary: string;
    primaryGradient: string;
    secondary: string;
    text: string;
    textMuted: string;
    cardBg: string;
    cardBorder: string;
    gridCell: string;
    gridCellActive: string;
    correct: string;
    incorrect: string;
  };
}