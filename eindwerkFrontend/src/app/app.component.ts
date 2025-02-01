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
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateBodyClass();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  updateBodyClass() {
    if (this.isLoggedIn) {
      document.body.classList.add('logged-in');
    } else {
      document.body.classList.remove('logged-in');
    }
  }

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
      next: () => {
        this.hideLoginPopup();
        this.isLoggedIn = true;
        this.updateBodyClass();
      },
      error: () => {
        this.errorMessage = 'Login failed. Please check your email and password.';
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

  handleRegister(data: { firstname: string; lastname: string; email: string; password: string; password_confirmation: string }): void {
    this.authService.register(data).subscribe({
      next: () => this.hideRegisterPopup(),
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  showPostPopup(): void {
    if (this.isLoggedIn) {
      this.isPostPopupVisible = true;
    } else {
      alert('Je moet ingelogd zijn om een post te plaatsen.');
    }
  }

  hidePostPopup(): void {
    this.isPostPopupVisible = false;
  }

  handlePostCreated(newPost: any): void {
    const user = this.authService.getUser();
    if (!user) {
      alert('Je moet ingelogd zijn om een post te plaatsen.');
      return;
    }

    const postWithUser = { ...newPost, user: { firstname: user.firstname, lastname: user.lastname } };
    this.posts.unshift(postWithUser);
    this.hidePostPopup();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.updateBodyClass();
    });
  }
}
