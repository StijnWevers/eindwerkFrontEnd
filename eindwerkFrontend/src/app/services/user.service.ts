import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  apiUrl = 'https://randomuser.me/api?results=15&nat=NL';

  async getUsers() {
    try {
      const response = await fetch(`${this.apiUrl}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
   
  }
}