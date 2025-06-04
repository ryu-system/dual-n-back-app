import { useLocalStorage } from './useLocalStorage';
import type { GameResult } from '../types/game';

export const useGameHistory = () => {
  const [history, setHistory] = useLocalStorage<GameResult[]>('dual-n-back-history', []);

  const addResult = (result: GameResult) => {
    setHistory(prev => [...prev, result]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getRecentResults = (count: number = 10) => {
    return history
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  };

  const getAverageAccuracy = (count: number = 10) => {
    const recent = getRecentResults(count);
    if (recent.length === 0) return 0;
    return recent.reduce((sum, result) => sum + result.accuracy, 0) / recent.length;
  };

  return {
    history,
    addResult,
    clearHistory,
    getRecentResults,
    getAverageAccuracy,
  };
};