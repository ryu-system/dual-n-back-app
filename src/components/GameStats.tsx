import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameHistory } from '@/hooks/useGameHistory';
import { ArrowLeft, TrendingUp, Target, Calendar, Trophy } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Game Statistics</h2>
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Games</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGames}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bestScore.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg (Last 10)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageAccuracy.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Sessions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentResults.length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Game Results</CardTitle>
            </CardHeader>
            <CardContent>
              {recentResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No games played yet. Start playing to see your statistics!
                </p>
              ) : (
                <div className="space-y-2">
                  {recentResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium">
                          N-{result.nLevel}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(result.date)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-green-600">{result.visualCorrect}V</span>
                          {' / '}
                          <span className="text-blue-600">{result.audioCorrect}A</span>
                        </div>
                        <div className="text-sm font-bold">
                          {result.accuracy.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {history.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm('Are you sure you want to clear all game history?')) {
                    clearHistory();
                  }
                }}
              >
                Clear History
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};