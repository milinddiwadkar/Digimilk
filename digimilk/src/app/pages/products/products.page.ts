import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddDairyProductsModalComponent } from '../../components/add-dairy-products-modal/add-dairy-products-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface Product {
  id: number;
  name: string;
  image: string;
  type: string;
  price: number;
  status: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Milk Pack',
      image: 'assets/products/milk-pack.jpg',
      type: 'Pack',
      price: 10,
      status: 'Available',
    },
    {
      id: 2,
      name: 'Cheese Block',
      image: 'assets/products/cheese.jpeg',
      type: 'Block',
      price: 20,
      status: 'Out of Stock',
    },
    // Add more products as needed
  ];

  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  public isDarkMode: boolean = false;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private darkModeService: DarkModeService

  ) {}

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  filterProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.paginatedProducts = this.filteredProducts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
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

  async openAddProductModal() {
    const modal = await this.modalController.create({
      component: AddDairyProductsModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const newProduct: Product = {
        id: this.products.length + 1, // Example ID generation
        name: data.name,
        image: URL.createObjectURL(data.image as File), // Handle image URL
        type: data.type,
        price: data.price,
        status: data.status,
      };
      this.products.push(newProduct);
      this.filterProducts(); // Update filter after adding a product
    }
  }

  async editProduct(product: Product) {
    const modal = await this.modalController.create({
      component: AddDairyProductsModalComponent,
      componentProps: { product },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.products.findIndex(p => p.id === data.id);
      if (index > -1) {
        this.products[index] = {
          id: data.id,
          name: data.name,
          image: URL.createObjectURL(data.image as File), // Handle image URL
          type: data.type,
          price: data.price,
          status: data.status,
        };
        this.filterProducts(); // Update filter after editing a product
      }
    }
  }

  async deleteProduct(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.products = this.products.filter(p => p.id !== id);
            this.filterProducts(); // Update filter after deleting a product
          },
        },
      ],
    });

    await alert.present();
  }
}