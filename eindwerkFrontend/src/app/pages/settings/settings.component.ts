import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  currentLanguage: string = 'Nederlands';

  setLanguage(language: string): void {
    this.currentLanguage = language;
    alert(`Taal gewijzigd naar: ${language}`);
  }
}
