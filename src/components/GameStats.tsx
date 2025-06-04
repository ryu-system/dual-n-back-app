import { Button } from '@/components/ui/button';
import { useGameHistory } from '@/hooks/useGameHistory';
import { ArrowLeft, TrendingUp, Target, Calendar, Trophy, BarChart3, Trash2 } from 'lucide-react';

interface GameStatsProps {
  onClose: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({ onClose }) => {
  const { history, getRecentResults, getAverageAccuracy, clearHistory } = useGameHistory();
  
  const recentResults = getRecentResults(10);
  const averageAccuracy = getAverageAccuracy(10);
  const totalGames = history.length;
  const bestScore = history.length > 0 ? Math.max(...history.map(r => r.accuracy)) : 0;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideUp">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Statistics</h2>
            </div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="h-12 px-6 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalGames}</div>
              <div className="text-sm font-medium text-gray-600">Total Games</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{bestScore.toFixed(1)}%</div>
              <div className="text-sm font-medium text-gray-600">Best Score</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{averageAccuracy.toFixed(1)}%</div>
              <div className="text-sm font-medium text-gray-600">Avg (Last 10)</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{recentResults.length}</div>
              <div className="text-sm font-medium text-gray-600">Recent Sessions</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Recent Game Results
            </h3>
            {recentResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  No games played yet
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Start playing to see your statistics!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N{result.nLevel}</span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {formatDate(result.date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-gray-700">{result.visualCorrect}P</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="font-semibold text-gray-700">{result.audioCorrect}L</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900 min-w-[60px] text-right">
                        {result.accuracy.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all game history?')) {
                    clearHistory();
                  }
                }}
                className="h-12 px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Clear History
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};