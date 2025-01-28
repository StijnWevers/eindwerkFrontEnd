import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostPopupComponent } from './post-popup/post-popup.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LoginComponent,
    RegisterComponent,
    PostPopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelpR';
  isLoginPopupVisible = false;
  isRegisterPopupVisible = false;
  isPostPopupVisible = false; 
  errorMessage = '';
  posts: any[] = [];

  constructor(private authService: AuthService) {}

  showLoginPopup(): void {
    this.isLoginPopupVisible = true;
    this.errorMessage = '';
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

  showRegisterPopup(): void {
    this.isRegisterPopupVisible = true;
    this.errorMessage = '';
  }

  hideRegisterPopup(): void {
    this.isRegisterPopupVisible = false;
    this.errorMessage = '';
  }

  handleRegister(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): void {
    this.authService.register(data).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.hideRegisterPopup();
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }

  // Post-pop-up logica
  showPostPopup(): void {
    console.log('Post knop geklikt');
    this.isPostPopupVisible = true;
  }

  hidePostPopup(): void {
    console.log('Post popup gesloten');
    this.isPostPopupVisible = false;
  }

  handlePostCreated(newPost: any): void {
    console.log('Nieuwe post aangemaakt:', newPost);
    this.posts.unshift(newPost);
    this.hidePostPopup();
  }
}
