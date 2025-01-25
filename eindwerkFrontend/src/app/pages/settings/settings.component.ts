import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  showLanguageOptions: boolean = false; // Controleert of de opties zichtbaar zijn

  toggleLanguageOptions(): void {
    this.showLanguageOptions = !this.showLanguageOptions; // Wisselt tussen zichtbaar en onzichtbaar
  }

  setLanguage(language: string): void {
    alert(`Taal gewijzigd naar: ${language}`);
    this.showLanguageOptions = false; // Verberg de opties na selectie
  }
}
