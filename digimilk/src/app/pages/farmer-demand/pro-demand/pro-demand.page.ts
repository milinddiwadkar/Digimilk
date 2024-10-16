import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddProductDemandModalComponent } from '../../../components/add-product-demand-modal/add-product-demand-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface ProductDemand {
  id: number;
  productId: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-pro-demand',
  templateUrl: './pro-demand.page.html',
  styleUrls: ['./pro-demand.page.scss'],
})
export class ProDemandPage implements OnInit {
  productDemands: ProductDemand[] = [
    {
      id: 1,
      productId: 'P001',
      name: 'Product A',
      description: 'High-quality product A',
      price: 50,
      weight: 1.5,
      status: 'Available',
      createdAt: new Date(),
    },
    {
      id: 2,
      productId: 'P002',
      name: 'Product B',
      description: 'Premium product B',
      price: 75,
      weight: 2.0,
      status: 'Out of Stock',
      createdAt: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedDemands: ProductDemand[] = [];
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
    });
  }

  get filteredDemands(): ProductDemand[] {
    return this.productDemands.filter(demand =>
      demand.productId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredDemands.length / this.entriesToShow);
    this.paginateDemands();
  }

  paginateDemands() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedDemands = this.filteredDemands.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateDemands();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateDemands();
    }
  }

  async openAddProductDemandModal() {
    const modal = await this.modalController.create({
      component: AddProductDemandModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.productDemands.push({
        id: this.productDemands.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editProductDemand(productDemand: { id: number }) {
    const modal = await this.modalController.create({
      component: AddProductDemandModalComponent,
      componentProps: { productDemand },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.productDemands.findIndex(demand => demand.id === productDemand.id);
      if (index > -1) {
        this.productDemands[index] = { ...this.productDemands[index], ...data };
        this.updatePagination();
      }
    }
  }

  async deleteProductDemand(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this product demand?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.productDemands = this.productDemands.filter(demand => demand.id !== id);
            this.updatePagination();
          },
        },
      ],
    });
    await alert.present();
  }
}