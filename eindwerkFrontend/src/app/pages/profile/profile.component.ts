import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    name: 'Yuriy',
    email: 'yuriy@example.com',
    username: 'kubik999',
    phone: '+3249873978',
    location: 'antwerpen, Belgie',
  };

  editProfile() {
    alert('Profiel Bewerken werkt nog niet!');
    // hier kan je fomulier of functionaliteit toevoegen
  }
}
