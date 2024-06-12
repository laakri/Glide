import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor() {}

  saveTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  getTheme(): string | null {
    return localStorage.getItem(this.THEME_KEY);
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyThemeFromLocalStorage(): void {
    const savedTheme = this.getTheme();
    if (savedTheme) {
      this.applyTheme(savedTheme);
    }
  }
}
