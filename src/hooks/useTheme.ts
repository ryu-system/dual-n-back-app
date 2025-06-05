import { useState, useEffect } from 'react';
import type { Theme, ThemeConfig } from '../types/game';
import { useLocalStorage } from './useLocalStorage';

const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'light',
    colors: {
      background: '#f3f4f6',
      backgroundGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      primary: '#4f46e5',
      primaryGradient: 'from-indigo-500 to-purple-500',
      secondary: '#8b5cf6',
      text: '#111827',
      textMuted: '#6b7280',
      cardBg: 'rgba(255, 255, 255, 0.8)',
      cardBorder: 'rgba(156, 163, 175, 0.3)',
      gridCell: 'rgba(79, 70, 229, 0.1)',
      gridCellActive: 'from-cyan-400 to-blue-500',
      correct: 'from-emerald-400 to-green-500',
      incorrect: 'from-red-400 to-rose-500',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#030712',
      backgroundGradient: 'from-indigo-950 via-purple-900 to-violet-950',
      primary: '#6366f1',
      primaryGradient: 'from-indigo-600 to-purple-600',
      secondary: '#a78bfa',
      text: '#f9fafb',
      textMuted: '#9ca3af',
      cardBg: 'rgba(0, 0, 0, 0.4)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      gridCell: 'rgba(255, 255, 255, 0.1)',
      gridCellActive: 'from-cyan-500 to-blue-600',
      correct: 'from-emerald-500 to-green-600',
      incorrect: 'from-red-500 to-rose-600',
    },
  },
  custom: {
    name: 'custom',
    colors: {
      background: '#0a0e27',
      backgroundGradient: 'from-slate-900 via-purple-900 to-slate-900',
      primary: '#e879f9',
      primaryGradient: 'from-fuchsia-500 to-pink-500',
      secondary: '#f472b6',
      text: '#fde68a',
      textMuted: '#fbbf24',
      cardBg: 'rgba(139, 92, 246, 0.1)',
      cardBorder: 'rgba(236, 72, 153, 0.3)',
      gridCell: 'rgba(232, 121, 249, 0.1)',
      gridCellActive: 'from-fuchsia-400 to-pink-500',
      correct: 'from-emerald-400 to-teal-500',
      incorrect: 'from-orange-400 to-red-500',
    },
  },
};

export function useTheme() {
  const [savedTheme, setSavedTheme] = useLocalStorage<Theme>('dual-n-back-theme', 'dark');
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themes[savedTheme]);

  useEffect(() => {
    const theme = themes[savedTheme];
    setCurrentTheme(theme);
    
    // CSS変数を設定
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // data-theme属性を設定
    root.setAttribute('data-theme', savedTheme);
  }, [savedTheme]);

  const changeTheme = (theme: Theme) => {
    setSavedTheme(theme);
  };

  return {
    theme: currentTheme,
    themeName: savedTheme,
    changeTheme,
    themes: Object.keys(themes) as Theme[],
  };
}