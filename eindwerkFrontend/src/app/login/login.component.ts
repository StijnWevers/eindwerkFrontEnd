import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() isVisible = false;
  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  errorMessage = '';
  

  onSubmit(): void {
    console.log('Form submitted');
    if (this.email && this.password) {
      this.login.emit({ email: this.email, password: this.password });
    } else {
      this.errorMessage = 'Please fill in both fields.';
    }
  }
  

  closePopup(): void {
    this.close.emit();
  }
}
