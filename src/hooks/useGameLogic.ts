import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameConfig, GameResult, Trial, Position } from '../types/game';
import { LETTERS } from '../types/game';

export const useGameLogic = (config: GameConfig, onGameEnd: (result: GameResult) => void) => {
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    currentTrialIndex: 0,
    trials: [],
    userInputs: {
      visual: [],
      audio: [],
    },
    showFeedback: false,
    feedbackType: null,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = useCallback((gridSize: number): Position => ({
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize),
  }), []);

  const generateRandomLetter = (): string => 
    LETTERS[Math.floor(Math.random() * LETTERS.length)];

  const generateTrials = useCallback(() => {
    const trials: Trial[] = [];
    const totalTrials = config.totalTrials + config.nLevel;

    for (let i = 0; i < totalTrials; i++) {
      if (i < config.nLevel) {
        trials.push({
          position: generateRandomPosition(config.gridSize),
          letter: generateRandomLetter(),
          timestamp: Date.now(),
        });
      } else {
        const shouldMatchVisual = Math.random() < 0.3;
        const shouldMatchAudio = Math.random() < 0.3;
        
        const position = shouldMatchVisual 
          ? trials[i - config.nLevel].position 
          : generateRandomPosition(config.gridSize);
        
        const letter = shouldMatchAudio 
          ? trials[i - config.nLevel].letter 
          : generateRandomLetter();

        trials.push({
          position,
          letter,
          timestamp: Date.now(),
        });
      }
    }

    return trials;
  }, [config.nLevel, config.totalTrials, config.gridSize, generateRandomPosition]);


  const startGame = useCallback(() => {
    const trials = generateTrials();
    setGameState({
      isRunning: true,
      currentTrialIndex: 0,
      trials,
      userInputs: {
        visual: new Array(trials.length).fill(false),
        audio: new Array(trials.length).fill(false),
      },
      showFeedback: false,
      feedbackType: null,
    });
  }, [generateTrials]);

  const handleInput = useCallback((inputType: 'visual' | 'audio') => {
    setGameState(prev => {
      if (!prev.isRunning || prev.currentTrialIndex < config.nLevel) {
        return prev;
      }

      const newInputs = { ...prev.userInputs };
      newInputs[inputType][prev.currentTrialIndex] = true;

      const currentTrial = prev.trials[prev.currentTrialIndex];
      const nBackTrial = prev.trials[prev.currentTrialIndex - config.nLevel];
      
      let isCorrect = false;
      if (inputType === 'visual') {
        isCorrect = currentTrial.position.row === nBackTrial.position.row &&
                   currentTrial.position.col === nBackTrial.position.col;
      } else {
        isCorrect = currentTrial.letter === nBackTrial.letter;
      }

      return {
        ...prev,
        userInputs: newInputs,
        showFeedback: true,
        feedbackType: isCorrect ? 'correct' : 'incorrect',
      };
    });
  }, [config.nLevel]);

  const nextTrial = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentTrialIndex + 1;
      
      if (nextIndex >= prev.trials.length) {
        const result = calculateResults(prev, config);
        onGameEnd(result);
        return {
          ...prev,
          isRunning: false,
        };
      }

      return {
        ...prev,
        currentTrialIndex: nextIndex,
        showFeedback: false,
        feedbackType: null,
      };
    });
  }, [config, onGameEnd]);

  useEffect(() => {
    if (gameState.isRunning && gameState.currentTrialIndex < gameState.trials.length) {
      // Audio playback removed - letters are now shown on the grid
      
      timeoutRef.current = setTimeout(() => {
        nextTrial();
      }, config.trialDuration);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [gameState.isRunning, gameState.currentTrialIndex, gameState.trials, config.trialDuration, nextTrial]);


  return {
    gameState,
    startGame,
    handleInput,
  };
};

function calculateResults(gameState: GameState, config: GameConfig) {
  let visualCorrect = 0;
  let visualIncorrect = 0;
  let audioCorrect = 0;
  let audioIncorrect = 0;

  for (let i = config.nLevel; i < gameState.trials.length; i++) {
    const currentTrial = gameState.trials[i];
    const nBackTrial = gameState.trials[i - config.nLevel];
    
    const visualMatch = currentTrial.position.row === nBackTrial.position.row &&
                       currentTrial.position.col === nBackTrial.position.col;
    const audioMatch = currentTrial.letter === nBackTrial.letter;
    
    const visualInput = gameState.userInputs.visual[i];
    const audioInput = gameState.userInputs.audio[i];

    if (visualMatch === visualInput) {
      visualCorrect++;
    } else {
      visualIncorrect++;
    }

    if (audioMatch === audioInput) {
      audioCorrect++;
    } else {
      audioIncorrect++;
    }
  }

  const totalAnswers = (visualCorrect + visualIncorrect + audioCorrect + audioIncorrect);
  const totalCorrect = visualCorrect + audioCorrect;
  const accuracy = totalAnswers > 0 ? (totalCorrect / totalAnswers) * 100 : 0;

  return {
    visualCorrect,
    visualIncorrect,
    audioCorrect,
    audioIncorrect,
    accuracy,
    nLevel: config.nLevel,
    date: new Date(),
  };
}