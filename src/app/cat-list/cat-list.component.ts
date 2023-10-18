import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from 'src/services/http.service.';
import { catDataList } from '../Modals/Modals';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css'],
})
export class CatListComponent {
  constructor(public restApi: HttpCallService, private router: Router) {}

  catData: catDataList[] = [];
  url: string = 'https://652e8e2a0b8d8ddac0b197f5.mockapi.io/test/Category';

  editingCatId: number | null = null;
  editedCat: catDataList = {} as catDataList;
  newCat: catDataList = {} as catDataList;

  isAddCatFormVisible: boolean = false;

  ngOnInit() {
    this.getData();
  }

  addCat() {
    this.isAddCatFormVisible = !this.isAddCatFormVisible;
  }

  addNewCat() {
    this.restApi.post(this.url, this.newCat).subscribe((response: any) => {
      this.catData.push(response);
      this.getData();
      this.newCat = {
        id: 0,
        name: '',
        description: '',
      };
      this.addCat();
    });
  }

  getData() {
    this.restApi.get(this.url).subscribe((data: any) => {
      this.catData = data;
      console.log(this.catData);
    });
  }

  editCat(id: number) {
    this.editingCatId = id;
    const CatToEdit = this.catData.find((cat) => cat.id === id);
    if (CatToEdit !== undefined) {
      this.editedCat = CatToEdit;
    } else {
      null;
    }
  }

  saveCat() {
    this.restApi
      .put(`${this.url}/${this.editingCatId}`, this.editedCat)
      .subscribe(() => {
        this.getData();
        this.editingCatId = null;
      });
  }

  cancelEdit() {
    this.editingCatId = null;
  }

  deleteCat(id: number) {
    const CatIndex = this.catData.findIndex((u) => u.id === id);
    if (CatIndex !== -1) {
      const CatToDelete = this.catData[CatIndex];
      this.restApi.delete(`${this.url}/${CatToDelete.id}`).subscribe(() => {
        this.catData.splice(CatIndex, 1);
      });
    }
  }
}
