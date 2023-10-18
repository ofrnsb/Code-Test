import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from 'src/services/http.service.';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public restApi: HttpCallService, private router: Router) {}

  toCatList() {
    this.router.navigate(['/cat-list']);
  }

  toProdList() {
    this.router.navigate(['/prod-list']);
  }

  toUsList() {
    this.router.navigate(['/us-list']);
  }

  logoutAdmin() {
    this.router.navigate(['/admin-login']);
  }
}
