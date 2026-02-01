import React, { useState, useEffect } from 'react';
import { themeManager } from '../utils/themeManager';

/**
 * 🎨 Theme Selector Component
 * Permite ao usuário alternar entre temas
 */
export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Obter tema atual
    setCurrentTheme(themeManager.getCurrentTheme());

    // Escutar mudanças de tema
    const handleThemeChange = (e) => {
      setCurrentTheme(e.detail.theme);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const themes = [
    {
      id: 'light',
      name: '☀️ Claro',
      description: 'Tema claro com verde vibrante'
    },
    {
      id: 'dark',
      name: '🌙 Escuro',
      description: 'Tema escuro para economia de bateria'
    },
    {
      id: 'high-contrast',
      name: '♿ Alto Contraste',
      description: 'Acessibilidade aumentada'
    },
    {
      id: 'auto',
      name: '🔄 Automático',
      description: 'Segue preferência do sistema'
    }
  ];

  const handleThemeChange = (themeId) => {
    themeManager.setTheme(themeId);
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeName = themes.find(t => t.id === currentTheme)?.name || 'Tema';

  return (
    <div className="theme-selector relative">
      {/* Botão com dropdown */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-semibold text-sm flex items-center gap-2"
          aria-label="Selecionar tema"
          aria-expanded={isOpen}
        >
          {currentThemeName}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50 animate-in fade-in slide-up">
            <div className="p-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full text-left px-4 py-3 rounded-md mb-1 transition-all ${
                    currentTheme === theme.id
                      ? 'bg-primary text-white font-semibold'
                      : 'bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="font-semibold text-base">{theme.name}</div>
                  <div className={`text-sm mt-1 ${
                    currentTheme === theme.id
                      ? 'text-green-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {theme.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Atalho rápido: Clique duplo para alternar */}
      <style>{`
        .theme-selector button {
          user-select: none;
        }
      `}</style>
    </div>
  );
}