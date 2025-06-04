import { BarChart3 } from 'lucide-react';

interface GameInfoProps {
  currentTrialIndex: number;
  totalTrials: number;
  nLevel: number;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  currentTrialIndex,
  totalTrials,
  nLevel,
}) => {
  const adjustedCurrentTrial = Math.max(0, currentTrialIndex - nLevel + 1);
  const adjustedTotalTrials = totalTrials;
  const progressPercentage = Math.min(100, (adjustedCurrentTrial / adjustedTotalTrials) * 100);

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-3">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white/90">Game Progress</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
          <span className="text-white/70">Trial:</span>
          <span className="font-mono text-lg font-bold text-white">
            {adjustedCurrentTrial} / {adjustedTotalTrials}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
          <span className="text-white/70">N-Level:</span>
          <span className="font-mono text-lg font-bold text-violet-300">{nLevel}</span>
        </div>
        
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Progress</span>
            <span className="text-white/90 font-semibold">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};