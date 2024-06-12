import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settings = {
    theme: 'sunset',
    username: '',
    email: '',
    password: '',
  };

  themes = ['sunset', 'light', 'forest'];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadSettings();
    const theme = this.themeService.getTheme();
    if (theme) {
      this.settings.theme = theme;
    } else {
      this.settings.theme = 'sunset';
    }
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.applyTheme(this.settings.theme);
    }
  }

  saveSettings(): void {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    alert('Settings saved successfully!');
  }

  changeTheme(theme: string): void {
    this.settings.theme = theme;
    this.themeService.saveTheme(theme);
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
