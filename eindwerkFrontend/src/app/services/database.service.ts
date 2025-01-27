import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  GetThisAPI = 'http://127.0.0.1:8000/api/jobs';

  async GetProfile() {
    try {
      const response = await fetch(`${this.GetThisAPI}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
   
  }
}
