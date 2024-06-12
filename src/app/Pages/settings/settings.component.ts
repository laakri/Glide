import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  themes = ['sunset', 'light', 'dark', 'forest'];

  constructor() {}

  ngOnInit(): void {
    this.loadSettings();
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
    this.applyTheme(theme);
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
