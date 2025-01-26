import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() isVisible = false;
  @Output() register = new EventEmitter<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>();
  @Output() close = new EventEmitter<void>();

  firstname = '';
  lastname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.firstname && this.lastname && this.email && this.password) {
      this.register.emit({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      });
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }

  closePopup(): void {
    this.close.emit();
  }
}
