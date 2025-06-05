import { useEffect, useCallback, useState } from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useTheme } from '@/hooks/useTheme';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { GameInfo } from './GameInfo';
import { GameSettings } from './GameSettings';
import { GameStats } from './GameStats';
import { Button } from '@/components/ui/button';
import { Settings, BarChart3 } from 'lucide-react';
import type { GameConfig, GameResult } from '../types/game';
import { DEFAULT_CONFIG, validateGridSize } from '../types/game';

export const DualNBackGame: React.FC = () => {
  const [gameConfig, setGameConfig] = useLocalStorage<GameConfig>('dual-n-back-config', DEFAULT_CONFIG);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { addResult } = useGameHistory();
  useTheme();

  const handleGameEnd = useCallback((result: GameResult) => {
    setGameResult(result);
    addResult(result);
  }, [addResult]);

  const { gameState, startGame, handleInput } = useGameLogic(
    gameConfig,
    handleGameEnd
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameState.isRunning) return;
    
    switch (event.key.toLowerCase()) {
      case 'a':
        event.preventDefault();
        handleInput('visual');
        break;
      case 'l':
        event.preventDefault();
        handleInput('audio');
        break;
    }
  }, [gameState.isRunning, handleInput]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const currentTrial = gameState.trials[gameState.currentTrialIndex];
  const currentPosition = currentTrial?.position || null;
  const currentLetter = currentTrial?.letter || null;

  if (gameResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 theme-gradient-bg">
        <div className="theme-card backdrop-blur-sm rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center space-y-4 sm:space-y-6 shadow-2xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full theme-gradient-correct">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold theme-text">Game Complete!</h2>
          <div className="space-y-3">
            <div className="theme-card rounded-2xl p-4 space-y-2">
              <p className="text-lg font-semibold theme-text">Accuracy: <span className="theme-text-primary">{gameResult.accuracy.toFixed(1)}%</span></p>
              <div className="grid grid-cols-2 gap-4 text-sm theme-text-muted">
                <p>Visual: <span className="font-semibold theme-text-primary">{gameResult.visualCorrect}</span></p>
                <p>Audio: <span className="font-semibold theme-text-secondary">{gameResult.audioCorrect}</span></p>
              </div>
              <p className="text-sm theme-text">N-Level: <span className="font-bold theme-text-primary">{gameResult.nLevel}</span></p>
            </div>
          </div>
          <Button
            onClick={() => setGameResult(null)}
            className="w-full h-12 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 theme-gradient-primary"
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden theme-gradient-bg">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,198,255,0.3),transparent_70%)]"></div>
        
        {/* Mobile Layout (lg and below) */}
        <div className="flex flex-col items-center gap-2 w-full relative z-10 px-2 sm:px-4 lg:hidden">
          <GameGrid
            activePosition={gameState.isRunning ? currentPosition : null}
            showFeedback={gameState.showFeedback}
            feedbackType={gameState.feedbackType}
            currentLetter={gameState.isRunning ? currentLetter : null}
            gridSize={validateGridSize(gameConfig.gridSize)}
          />
          
          <GameControls
            isRunning={gameState.isRunning}
            onStart={startGame}
            onVisualInput={() => handleInput('visual')}
            onAudioInput={() => handleInput('audio')}
            currentLevel={gameConfig.nLevel}
          />
          
          <GameInfo
            currentTrialIndex={gameState.currentTrialIndex}
            totalTrials={gameConfig.totalTrials}
            nLevel={gameConfig.nLevel}
          />
          
          {!gameState.isRunning && (
            <div className="flex gap-2 w-full max-w-sm">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                className="flex-1 h-12 theme-button-outline backdrop-blur-sm rounded-xl transition-all duration-200"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStats(true)}
                className="flex-1 h-12 theme-button-outline backdrop-blur-sm rounded-xl transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Statistics
              </Button>
            </div>
          )}
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex lg:flex-row items-center gap-8 max-w-6xl w-full relative z-10 px-8">
          <div className="flex-1 flex justify-center">
            <GameGrid
              activePosition={gameState.isRunning ? currentPosition : null}
              showFeedback={gameState.showFeedback}
              feedbackType={gameState.feedbackType}
              currentLetter={gameState.isRunning ? currentLetter : null}
              gridSize={validateGridSize(gameConfig.gridSize)}
            />
          </div>
          
          <div className="flex flex-col gap-6 w-auto">
            <GameInfo
              currentTrialIndex={gameState.currentTrialIndex}
              totalTrials={gameConfig.totalTrials}
              nLevel={gameConfig.nLevel}
            />
            
            <GameControls
              isRunning={gameState.isRunning}
              onStart={startGame}
              onVisualInput={() => handleInput('visual')}
              onAudioInput={() => handleInput('audio')}
              currentLevel={gameConfig.nLevel}
            />
            
            {!gameState.isRunning && (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="w-full h-12 theme-button-outline backdrop-blur-sm rounded-xl transition-all duration-200"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowStats(true)}
                  className="w-full h-12 theme-button-outline backdrop-blur-sm rounded-xl transition-all duration-200"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Statistics
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showSettings && (
        <GameSettings
          config={gameConfig}
          onConfigChange={setGameConfig}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {showStats && (
        <GameStats onClose={() => setShowStats(false)} />
      )}
    </>
  );
};