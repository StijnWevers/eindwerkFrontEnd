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
  @Output() login = new EventEmitter<{ username: string; password: string }>();
  @Output() close = new EventEmitter<void>();

  username = '';
  password = '';

  onSubmit(): void {
    this.login.emit({ username: this.username, password: this.password });
    this.closePopup();
  }

  closePopup(): void {
    this.close.emit();
  }
}
