/**
 * 🎨 Theme Manager
 * Gerencia temas da aplicação (light, dark, high-contrast)
 * Suporta preferências do sistema operacional
 */

const THEME_KEY = 'vamos_theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast',
  AUTO: 'auto' // Segue preferência do sistema
};

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.element = document.documentElement;
    this.applyTheme(this.currentTheme);
    this.observeSystemPreference();
  }

  /**
   * Obter tema armazenado no localStorage
   */
  getStoredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    return THEMES.AUTO;
  }

  /**
   * Obter tema do sistema (light ou dark)
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  /**
   * Obter tema efetivo (se auto, usa sistema)
   */
  getEffectiveTheme() {
    if (this.currentTheme === THEMES.AUTO) {
      return this.getSystemTheme();
    }
    return this.currentTheme;
  }

  /**
   * Aplicar tema ao HTML
   */
  applyTheme(theme) {
    const effectiveTheme = theme === THEMES.AUTO ? this.getSystemTheme() : theme;
    
    // Remover todas as classes de tema
    Object.values(THEMES).forEach(t => {
      if (t !== THEMES.AUTO) {
        this.element.classList.remove(`theme-${t}`);
        this.element.removeAttribute(`data-theme`);
      }
    });
    
    // Aplicar novo tema
    if (effectiveTheme !== THEMES.LIGHT) {
      this.element.setAttribute('data-theme', effectiveTheme);
    }
    
    // Atualizar meta tag
    this.updateMetaThemeColor(effectiveTheme);
    
    this.currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    
    // Disparar evento customizado
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme, effectiveTheme }
    }));
  }

  /**
   * Alternar para um tema específico
   */
  setTheme(theme) {
    if (Object.values(THEMES).includes(theme)) {
      this.applyTheme(theme);
    }
  }

  /**
   * Ciclar entre temas
   */
  cycleTheme() {
    const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.HIGH_CONTRAST];
    const currentIndex = themes.indexOf(
      this.currentTheme === THEMES.AUTO ? this.getSystemTheme() : this.currentTheme
    );
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  /**
   * Observar mudanças de preferência do sistema
   */
  observeSystemPreference() {
    if (!window.matchMedia) return;
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Compatibilidade com navegadores antigos
    if (darkModeQuery.addListener) {
      darkModeQuery.addListener(() => {
        if (this.currentTheme === THEMES.AUTO) {
          this.applyTheme(THEMES.AUTO);
        }
      });
    } else if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', () => {
        if (this.currentTheme === THEMES.AUTO) {
          this.applyTheme(THEMES.AUTO);
        }
      });
    }
  }

  /**
   * Atualizar cor do tema nas meta tags
   */
  updateMetaThemeColor(theme) {
    let color = '#22c55e'; // Verde padrão (light)
    
    if (theme === THEMES.DARK) {
      color = '#1e293b'; // Escuro
    } else if (theme === THEMES.HIGH_CONTRAST) {
      color = '#ffffff'; // Branco
    }
    
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      document.head.appendChild(metaTag);
    }
    metaTag.content = color;
  }

  /**
   * Obter tema atual
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Verificar se está em dark mode
   */
  isDarkMode() {
    return this.getEffectiveTheme() === THEMES.DARK;
  }

  /**
   * Obter objeto com todos os temas disponíveis
   */
  getAvailableThemes() {
    return THEMES;
  }
}

// Exportar singleton
export const themeManager = new ThemeManager();

// Também exportar para uso global
window.themeManager = themeManager;

export default themeManager;