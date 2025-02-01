import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  //actieve taal
  currentLanguage: string = 'Nederlands';

  // Hier komen je vertalingen
  translations: { [key: string]: any } = {
    Nederlands: {
      settingsTitle: 'Instellingen',
      languageSectionTitle: 'Taal wijzigen',
      // languageAlertText: (lang: string) => `Taal gewijzigd naar: ${lang}`,
    },
    Engels: {
      settingsTitle: 'Settings',
      languageSectionTitle: 'Change Language',
      // languageAlertText: (lang: string) => `Language changed to: ${lang}`,
    },
    Chinees: {
      settingsTitle: '设置',
      languageSectionTitle: '更改语言',
      // languageAlertText: (lang: string) => `语言更改为: ${lang}`,
    },
  };

  // Methode om de taal te veranderen
  setLanguage(language: string): void {
    this.currentLanguage = language;
    alert(this.translations[this.currentLanguage].languageAlertText(language));
  }
}
