import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddProductModalComponent } from '../../../components/add-product-modal/add-product-modal.component';

interface Product {
  name: string;
  productType: string;
  price: number;
  status: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  searchQuery = '';
  currentPage = 1;
  entriesToShow = 5;
  totalPages = 1;

  addProductForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      productType: ['', Validators.required],
      price: [0, Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [
      { name: 'Product 1', productType: 'Type A', price: 100, status: true, createdAt: new Date() },
      // Add more products here
    ];
    this.filteredProducts = [...this.products];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.entriesToShow);
    this.paginatedProducts = this.filteredProducts.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddProductModal() {
    this.modalCtrl.create({
      component: AddProductModalComponent,
      componentProps: {
        form: this.addProductForm
      }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newProduct: Product = {
            name: result.data.name,
            productType: result.data.productType,
            price: result.data.price,
            status: result.data.status,
            createdAt: new Date()
          };
          this.products.push(newProduct);
          this.filteredProducts = [...this.products];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: Product) {
    // Logic to edit product
  }

  deleteProduct(item: Product) {
    this.products = this.products.filter(product => product !== item);
    this.filteredProducts = [...this.products];
    this.updatePagination();
  }

  onEntriesChange(event: any) {
    this.entriesToShow = event.detail.value;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}

