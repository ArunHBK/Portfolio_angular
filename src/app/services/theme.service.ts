import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private platformId = inject(PLATFORM_ID);
  
  // Signal for reactive theme state
  public readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply initial theme only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(this.theme());
      this.setupSystemThemeListener();
    }
  }

  private getInitialTheme(): Theme {
    // Only access browser APIs in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Check localStorage first
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }

      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Default theme for SSR
    return 'light';
  }

  private setupSystemThemeListener(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem(this.THEME_KEY)) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.theme.set(newTheme);
        this.applyTheme(newTheme);
      }
    });
  }

  public toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this.theme.set(theme);
    
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(theme);
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    root.classList.add(`${theme}-theme`);
    
    // Update data attribute for CSS
    root.setAttribute('data-theme', theme);
  }

  public isDark(): boolean {
    return this.theme() === 'dark';
  }

  public isLight(): boolean {
    return this.theme() === 'light';
  }
}