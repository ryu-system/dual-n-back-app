import type { Position } from '../types/game';
import { GRID_SIZE } from '../types/game';
import { cn } from '@/lib/utils';

interface GameGridProps {
  activePosition: Position | null;
  showFeedback: boolean;
  feedbackType: 'correct' | 'incorrect' | null;
  currentLetter: string | null;
}

export const GameGrid: React.FC<GameGridProps> = ({ 
  activePosition, 
  showFeedback, 
  feedbackType,
  currentLetter 
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl max-w-xs sm:max-w-sm lg:max-w-none">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        const isActive = activePosition && 
          activePosition.row === row && 
          activePosition.col === col;

        return (
          <div
            key={index}
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-2xl transition-all duration-300 relative overflow-hidden",
              "bg-white/20 border-2 border-white/30 shadow-lg backdrop-blur-sm",
              "hover:scale-105 hover:shadow-xl",
              isActive && !showFeedback && "bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 shadow-cyan-400/50 scale-110",
              isActive && showFeedback && feedbackType === 'correct' && "bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 shadow-emerald-400/50 scale-110",
              isActive && showFeedback && feedbackType === 'incorrect' && "bg-gradient-to-br from-red-400 to-rose-500 border-red-300 shadow-red-400/50 scale-110"
            )}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                {currentLetter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                      {currentLetter}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};