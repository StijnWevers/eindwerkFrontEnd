import { Component, signal } from '@angular/core';
// import json pipe
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  constructor(private databaseService: DatabaseService) { }
  jobs = signal<any[]>([])

  mainProgressBar = 0;

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
    this.databaseService.GetProfile().then(jobs => {
      console.log(jobs);
      this.jobs.set(jobs);
    });

  }

}