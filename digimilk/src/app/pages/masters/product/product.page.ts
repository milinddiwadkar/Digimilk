import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddProductModalComponent } from '../../../components/add-product-modal/add-product-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface Product {
  id: number;
  name: string;
  productType: string;
  price: number;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      productType: 'Type A',
      price: 500,
      status: 'Available',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Product 2',
      productType: 'Type B',
      price: 300,
      status: 'Out of Stock',
      createdAt: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedProducts: Product[] = [];
  totalPages = 1;
  public isDarkMode: boolean = false;


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      document.body.classList.toggle('dark-mode', isDarkMode);
    });
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.productType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.entriesToShow);
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  async openAddProductModal() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.products.push({
        id: this.products.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

 
  async editProduct(product: Product) {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps: { product },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.products.findIndex(
        (item) => item.id === product.id
      );
      if (index > -1) {
        this.products[index] = { id: product.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteProduct(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.products = this.products.filter((product) => product.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
