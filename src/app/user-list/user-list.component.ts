import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from 'src/services/http.service.';
import { prodDataList } from '../Modals/Modals';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  // Properti yang diperlukan
  prodData: prodDataList[] = [];
  url: string = 'https://652e8e2a0b8d8ddac0b197f5.mockapi.io/test/List';
  editingprodId: number | null = null;
  editedprod: prodDataList = {} as prodDataList;
  newprod: prodDataList = {} as prodDataList;
  isAddprodFormVisible: boolean = false;

  // Properti untuk transaksi
  transactionType: string = 'Stock In'; // 'Stock In' atau 'Stock Out'
  selectedProducts: prodDataList[] = [];
  transactionQuantity: number = 0;

  // Riwayat transaksi
  transactionHistory: any[] = [];

  constructor(public restApi: HttpCallService, private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  addprod() {
    this.isAddprodFormVisible = !this.isAddprodFormVisible;
  }

  addNewprod() {
    this.restApi.post(this.url, this.newprod).subscribe((response: any) => {
      this.prodData.push(response);
      this.getData();
      this.newprod = {
        id: 0,
        name: '',
        description: '',
        gambar: '',
        category: '',
        stock: 0,
      };
      this.addprod();
    });
  }

  getData() {
    this.restApi.get(this.url).subscribe((data: any) => {
      this.prodData = data;
      console.log(this.prodData);
    });
  }

  editprod(id: number) {
    this.editingprodId = id;
    const prodToEdit = this.prodData.find((prod) => prod.id === id);
    if (prodToEdit !== undefined) {
      this.editedprod = prodToEdit;
    } else {
      null;
    }
  }

  saveprod() {
    this.restApi
      .put(`${this.url}/${this.editingprodId}`, this.editedprod)
      .subscribe(() => {
        this.getData();
        this.editingprodId = null;
      });
  }

  cancelEdit() {
    this.editingprodId = null;
  }

  deleteprod(id: number) {
    const prodIndex = this.prodData.findIndex((u) => u.id === id);
    if (prodIndex !== -1) {
      const prodToDelete = this.prodData[prodIndex];
      this.restApi.delete(`${this.url}/${prodToDelete.id}`).subscribe(() => {
        this.prodData.splice(prodIndex, 1);
        const selectedProductIndex = this.selectedProducts.findIndex(
          (p) => p.id === id
        );
        if (selectedProductIndex !== -1) {
          this.selectedProducts.splice(selectedProductIndex, 1);
        }
      });
    }
  }

  addToTransaction(product: prodDataList) {
    // Memeriksa apakah produk dengan ID yang sama sudah ada dalam transaksi
    const isProductSelected = this.selectedProducts.some(
      (p) => p.id === product.id
    );

    if (isProductSelected) {
      alert('Produk ini sudah ada dalam transaksi.');
    } else {
      this.selectedProducts.push(product);
    }
  }

  removeFromTransaction(product: prodDataList) {
    const index = this.selectedProducts.indexOf(product);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }

  updateProductStock(productId: number, newStock: number) {
    const productIndex = this.prodData.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      this.prodData[productIndex].stock = newStock;
      this.restApi
        .put(`${this.url}/${productId}`, this.prodData[productIndex])
        .subscribe(() => {
          console.log(`Stock for product ${productId} updated to ${newStock}`);
        });
    }
  }

  performTransaction() {
    if (this.selectedProducts.length === 0) {
      alert('Pilih produk sebelum melakukan transaksi.');
      return;
    }

    if (this.transactionType === 'Stock In') {
      for (const product of this.selectedProducts) {
        product.stock += this.transactionQuantity;
        this.updateProductStock(product.id, product.stock);
      }
    } else if (this.transactionType === 'Stock Out') {
      for (const product of this.selectedProducts) {
        if (product.stock < this.transactionQuantity) {
          alert('Jumlah transaksi Stock Out melebihi stok produk.');
          return;
        }
        product.stock -= this.transactionQuantity;
        this.updateProductStock(product.id, product.stock);
      }
    }

    this.transactionHistory.push({
      type: this.transactionType,
      products: this.selectedProducts.map((product) => ({
        id: product.id,
        name: product.name,
      })),
      quantity: this.transactionQuantity,
      date: new Date(),
    });

    this.transactionType = 'Stock In';
    this.selectedProducts = [];
    this.transactionQuantity = 0;
  }

  getTransactionProducts(transaction: any) {
    return transaction.products.map((p: any) => p.name).join(', ');
  }
}
