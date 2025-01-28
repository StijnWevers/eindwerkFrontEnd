import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.css']
})
export class PostPopupComponent {
  @Output() postCreated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();
  @Input() isVisible = false;

  title = '';
  description = '';
  fee: number | null = null;

  createPost() {
    if (this.title && this.description && this.fee !== null && this.fee > 0) {
      const newPost = { title: this.title, description: this.description, fee: this.fee };
      this.postCreated.emit(newPost);
      this.closePopup.emit();
      this.resetFields();
    } else {
      alert('Vul alle velden correct in!');
    }
  }

  cancel() {
    console.log('Post annuleren');
    this.closePopup.emit();
  }

  resetFields() {
    this.title = '';
    this.description = '';
    this.fee = null;
  }
}
