import { Component, OnInit } from '@angular/core';

import { userDataList } from '../Modals/Modals';
import { HttpCallService } from 'src/services/http.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css'],
})
export class ProdListComponent implements OnInit {
  constructor(public restApi: HttpCallService, private router: Router) {}

  userData: userDataList[] = [];
  url: string = 'https://652e8c840b8d8ddac0b194c7.mockapi.io/admin/userData';

  editingUserId: number | null = null;
  editedUser: userDataList = {} as userDataList;
  newUser: userDataList = {} as userDataList;

  isAddUserFormVisible: boolean = false;

  ngOnInit() {
    this.getData();
  }

  addUser() {
    this.isAddUserFormVisible = !this.isAddUserFormVisible;
  }

  addNewUser() {
    this.restApi.post(this.url, this.newUser).subscribe((response: any) => {
      this.userData.push(response);
      this.getData();
      this.newUser = {
        email: '',
        id: 0,
        jenisKelamin: '',
        namaBelakang: '',
        namaDepan: '',
        password: '',
        tanggalLahir: 1,
      };
      this.addUser();
    });
  }

  getData() {
    this.restApi.get(this.url).subscribe((data: any) => {
      this.userData = data;
    });
  }

  editUser(id: number) {
    this.editingUserId = id;
    const userToEdit = this.userData.find((user) => user.id === id);
    if (userToEdit !== undefined) {
      this.editedUser = userToEdit;
    } else {
      null;
    }
  }

  saveUser() {
    this.restApi
      .put(`${this.url}/${this.editingUserId}`, this.editedUser)
      .subscribe(() => {
        this.getData();
        this.editingUserId = null;
      });
  }

  cancelEdit() {
    this.editingUserId = null;
  }

  deleteUser(id: number) {
    const userIndex = this.userData.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      const userToDelete = this.userData[userIndex];
      this.restApi.delete(`${this.url}/${userToDelete.id}`).subscribe(() => {
        this.userData.splice(userIndex, 1);
      });
    }
  }
}
