// src/app/dark-mode.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  updateDarkMode: any;

  constructor() {
    this.initializeDarkMode();
  }

  initializeDarkMode(): void {
    // Load the saved theme preference from localStorage or default to false (light mode)
    const savedMode = localStorage.getItem('darkMode') === 'true';
    this.setDarkMode(savedMode);
  }

  toggleDarkMode(isDarkMode?: boolean): void {
    const currentMode = this.darkModeSubject.value;
    this.setDarkMode(!currentMode);
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    this.updateTheme(isDarkMode);
  }

  isDarkModeEnabled(): boolean {
    return this.darkModeSubject.value;
  }

  private updateTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
