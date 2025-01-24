import { Component, signal } from '@angular/core';

import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  editProfile() {
    alert('Profiel Bewerken werkt nog niet!');
    // hier kan je fomulier of functionaliteit toevoegen
  }

  constructor (private usersService: UsersService) { }
  users = signal<any[]>([]);
  ngOnInit() {
    this.usersService.getProfile().then(users => {
      console.log(users);
      this.users.set(users['results']);
    });

  }


}
