import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/AuthService.service';
import { Router } from '@angular/router'; // Use the Angular router

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  url: string = 'https://652e8c840b8d8ddac0b194c7.mockapi.io/admin/AdminData';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.http.get(this.url).subscribe((data: any) => {
      const foundUser = data.find(
        (user: any) =>
          user.userName === this.username && user.Password === this.password
      );

      if (foundUser) {
        this.authService.login(); // Set authentication status to true.
        console.log('User authenticated');
        // Redirect to the 'prod-list' route using the Angular router.
        this.router.navigate(['/us-list']);
      } else {
        this.authService.logout(); // Set authentication status to false.
        console.log('Authentication failed');
      }
    });
  }
}
