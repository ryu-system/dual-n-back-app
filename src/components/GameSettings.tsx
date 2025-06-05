import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings2, Palette, Grid3x3, Zap } from 'lucide-react';
import type { GameConfig, Theme } from '../types/game';
import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../types/game';
import { useTheme } from '@/hooks/useTheme';

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
  const { themeName, changeTheme, themes } = useTheme();

  const handleChange = (key: keyof GameConfig, value: string | number | boolean) => {
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

          <div className="space-y-2">
            <Label htmlFor="gridSize">Grid Size</Label>
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-gray-600" />
              <select
                id="gridSize"
                aria-label="Select grid size"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={config.gridSize}
                onChange={(e) => handleChange('gridSize', parseInt(e.target.value))}
              >
                {Array.from({ length: MAX_GRID_SIZE - MIN_GRID_SIZE + 1 }, (_, i) => i + MIN_GRID_SIZE).map((size) => (
                  <option key={size} value={size}>
                    {size}x{size}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground">
              Size of the game grid ({MIN_GRID_SIZE}x{MIN_GRID_SIZE} to {MAX_GRID_SIZE}x{MAX_GRID_SIZE})
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="autoAdjust">Auto-Adjust N-Level</Label>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-gray-600" />
              <Switch
                id="autoAdjust"
                checked={config.autoAdjustNLevel}
                onCheckedChange={(checked) => handleChange('autoAdjustNLevel', checked)}
              />
              <span className="text-sm text-gray-600">
                {config.autoAdjustNLevel ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically adjust N-Level based on your performance
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-600" />
              <select
                id="theme"
                aria-label="Select color theme"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={themeName}
                onChange={(e) => changeTheme(e.target.value as Theme)}
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground">
              Choose your preferred color theme
            </p>
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