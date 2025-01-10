import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a routerLink="/messages" routerLinkActive="active">Messages</a>
      <a routerLink="/settings" routerLinkActive="active">Settings</a>
      <a routerLink="/profile" routerLinkActive="active">Profile</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
