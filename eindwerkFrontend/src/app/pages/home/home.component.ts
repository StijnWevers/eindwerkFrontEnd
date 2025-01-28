import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { PostPopupComponent } from '../../post-popup/post-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostPopupComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private databaseService: DatabaseService) {}

  jobs = signal<any[]>([]);
  mainProgressBar = 0;
  isPostPopupVisible = false; 

  updateMainProgressBar(jobFee: number): void {
    if (this.mainProgressBar < 100) {
      const percentageToAdd = jobFee * 0.1;
      this.mainProgressBar += percentageToAdd;

      if (this.mainProgressBar >= 100) {
        this.mainProgressBar = 100;
        this.popup(); 
      }
    }
  }

  popup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'flex';
    }
    this.mainProgressBar = 0;
  }

  ngOnInit() {
    this.databaseService.GetProfile().then((jobs) => {
      console.log(jobs); 
      this.jobs.set(jobs); 
    });
  }

  showPostPopup(): void {
    console.log('Post popup openen'); 
    this.isPostPopupVisible = true; 
  }

  hidePostPopup(): void {
    console.log('Post popup sluiten');
    this.isPostPopupVisible = false;
  }

  handlePostCreated(newPost: any): void {
    console.log('Nieuwe post toegevoegd:', newPost); 
    this.jobs.update((jobs) => [newPost, ...jobs]);
    this.hidePostPopup(); 
  }
}
