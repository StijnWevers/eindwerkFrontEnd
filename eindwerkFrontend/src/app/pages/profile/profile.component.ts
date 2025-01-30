import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = signal<any>(null);
  jobs = signal<any[]>([]);

  constructor(private authService: AuthService, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (userData) => {
        console.log('Gebruiker:', userData);
        this.user.set(userData); 
      },
      error: (err) => {
        console.error('Fout bij ophalen profiel:', err);
      }
    });

    this.databaseService.GetProfile().then(jobs => {
      console.log(jobs);
      this.jobs.set(jobs);
    });
  }
}
