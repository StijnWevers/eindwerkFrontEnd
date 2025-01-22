import { Component, signal } from '@angular/core';
// import json pipe
import { UsersService } from '../../services/user.service';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  constructor(private usersService: UsersService) { }
  users = signal<any[]>([]);

  mainProgressBar = 0;

  updateMainProgressBar(amount: number): void {
    this.mainProgressBar += amount;
    if (this.mainProgressBar > 90) {
      this.mainProgressBar = 90;
      this.popup();
    }
  }
  showCompletePopup() {
    alert('Voortgang is voltooid!');
    this.mainProgressBar = 0;
  }

  popup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'flex';
    }
  }
  ngOnInit() {
    this.usersService.getUsers().then(users => {
      console.log(users);
      this.users.set(users['results']);
    });

  }

  
}