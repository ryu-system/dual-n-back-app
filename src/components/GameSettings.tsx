import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings2, Volume2, VolumeX } from 'lucide-react';
import type { GameConfig } from '../types/game';

interface GameSettingsProps {
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onClose: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  config,
  onConfigChange,
  onClose,
}) => {
  const handleChange = (key: keyof GameConfig, value: any) => {
    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 animate-slideUp">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4">
            <Settings2 className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Game Settings</h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nLevel">N-Level</Label>
            <Input
              id="nLevel"
              type="number"
              min="1"
              max="5"
              value={config.nLevel}
              onChange={(e) => handleChange('nLevel', parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-muted-foreground">
              Number of trials to remember back (1-5)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trialDuration">Trial Duration (ms)</Label>
            <Input
              id="trialDuration"
              type="number"
              min="1000"
              max="5000"
              step="250"
              value={config.trialDuration}
              onChange={(e) => handleChange('trialDuration', parseInt(e.target.value) || 2500)}
            />
            <p className="text-xs text-muted-foreground">
              How long each stimulus is shown (1000-5000ms)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalTrials">Total Trials</Label>
            <Input
              id="totalTrials"
              type="number"
              min="10"
              max="50"
              value={config.totalTrials}
              onChange={(e) => handleChange('totalTrials', parseInt(e.target.value) || 20)}
            />
            <p className="text-xs text-muted-foreground">
              Number of trials per session (10-50)
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3">
              {config.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-purple-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <Label htmlFor="soundEnabled" className="text-base font-medium cursor-pointer">
                Sound {config.soundEnabled ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
            <Switch
              id="soundEnabled"
              checked={config.soundEnabled}
              onCheckedChange={(checked) => handleChange('soundEnabled', checked)}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={onClose} 
              className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};