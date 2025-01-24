import { Component, signal } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
//import json pipe
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  constructor (private databaseService: DatabaseService) { }

  jobs = signal<any[]>([])
  ngOnInit() {
    this.databaseService.GetProfile().then(jobs => {
      console.log(jobs);
      this.jobs.set(jobs['results']);
    });
  }
  
  editProfile() {
    alert('Profiel Bewerken werkt nog niet!');
    // hier kan je fomulier of functionaliteit toevoegen
  }
}
