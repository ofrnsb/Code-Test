import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {}

  login() {
    // Implement your authentication logic here.
    // If authentication is successful, set this.isAuthenticated to true.
    this.isAuthenticated = true;
  }

  logout() {
    // Implement your logout logic here.
    this.isAuthenticated = false;
  }

  isAdminAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
