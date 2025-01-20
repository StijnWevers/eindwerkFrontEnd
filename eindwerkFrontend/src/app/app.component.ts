import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelpR'; 
  isLoginPopupVisible = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  showLoginPopup(): void {
    this.isLoginPopupVisible = true;
  }

  hideLoginPopup(): void {
    this.isLoginPopupVisible = false;
    this.errorMessage = ''; 
  }

  handleLogin(credentials: { email: string; password: string }): void {
    this.authService.login(credentials.email, credentials.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.hideLoginPopup(); 
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your email and password.';
        console.error('Login error:', err);
      }
    });
  }
}
