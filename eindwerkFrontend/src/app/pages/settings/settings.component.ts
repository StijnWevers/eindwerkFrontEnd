import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  // Welke taal is actief
  currentLanguage: string = 'Nederlands';

  // Hier komen je vertalingen
  translations: { [key: string]: any } = {
    Nederlands: {
      settingsTitle: 'Instellingen',
      languageSectionTitle: 'Taal wijzigen',
      languageAlertText: (lang: string) => `Taal gewijzigd naar: ${lang}`,
      // Enzovoort, elk stukje tekst dat je wilt tonen
    },
    Engels: {
      settingsTitle: 'Settings',
      languageSectionTitle: 'Change Language',
      languageAlertText: (lang: string) => `Language changed to: ${lang}`,
    },
    Chinees: {
      settingsTitle: '设置',
      languageSectionTitle: '更改语言',
      languageAlertText: (lang: string) => `语言更改为: ${lang}`,
    },
  };

  // Methode om de taal te veranderen
  setLanguage(language: string): void {
    this.currentLanguage = language;
    alert(this.translations[this.currentLanguage].languageAlertText(language));
  }
}
