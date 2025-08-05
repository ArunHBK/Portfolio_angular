import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button 
      class="theme-toggle" 
      (click)="toggleTheme()" 
      [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      title="{{ themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode' }}">
      
      <!-- Sun Icon for Light Mode -->
      <svg 
        class="theme-icon sun-icon" 
        [class.active]="themeService.isLight()"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      
      <!-- Moon Icon for Dark Mode -->
      <svg 
        class="theme-icon moon-icon" 
        [class.active]="themeService.isDark()"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      
      <span class="sr-only">Toggle theme</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background: var(--bg-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .theme-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px var(--shadow-color);
    }

    .theme-icon {
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: rotate(-90deg) scale(0.5);
    }

    .theme-icon.active {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }

    .sun-icon {
      color: #fbbf24;
    }

    .moon-icon {
      color: #6366f1;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @media (max-width: 768px) {
      .theme-toggle {
        width: 2.2rem;
        height: 2.2rem;
      }
      
      .theme-icon {
        width: 1rem;
        height: 1rem;
      }
    }
  `]
})
export class ThemeToggleComponent {
  public readonly themeService = inject(ThemeService);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}