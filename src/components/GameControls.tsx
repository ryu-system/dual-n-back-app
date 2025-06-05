import { Button } from '@/components/ui/button';
import { Play, Eye, Type } from 'lucide-react';

interface GameControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onVisualInput: () => void;
  onAudioInput: () => void;
  currentLevel: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isRunning,
  onStart,
  onVisualInput,
  onAudioInput,
  currentLevel,
}) => {
  return (
    <div className="w-full max-w-xs sm:max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl mb-3">
            <span className="text-2xl font-bold text-white">{currentLevel}</span>
          </div>
          <h3 className="text-lg font-semibold text-white/90">N-Level</h3>
        </div>
        
        {!isRunning ? (
          <Button 
            onClick={onStart} 
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button
              onClick={onVisualInput}
              className="h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 relative overflow-hidden touch-manipulation"
              size="lg"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <Eye className="w-5 h-5" />
                <span className="text-xl font-bold">A</span>
                <span className="text-xs opacity-90 leading-none">Position</span>
              </div>
            </Button>
            <Button
              onClick={onAudioInput}
              className="h-16 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 relative overflow-hidden touch-manipulation"
              size="lg"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <Type className="w-5 h-5" />
                <span className="text-xl font-bold">L</span>
                <span className="text-xs opacity-90 leading-none">Letter</span>
              </div>
            </Button>
          </div>
        )}
        
        {isRunning && (
          <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/70">
              Press <span className="font-bold text-blue-300">'A'</span> for position match, <span className="font-bold text-purple-300">'L'</span> for letter match
            </p>
          </div>
        )}
      </div>
    </div>
  );
};