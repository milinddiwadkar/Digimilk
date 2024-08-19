import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [{ username: 'user', password: 'pass' }]; // Example data

  constructor() {}

  login(username: string, password: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      const user = this.users.find(u => u.username === username && u.password === password);
      resolve({ success: !!user });
    });
  }
}
