  import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddFarmerRdDetailModalComponent } from '../../../components/add-farmer-rd-detail-modal/add-farmer-rd-detail-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface FarmerRDDetail {
  id:number;
  farmerName: string;
  tenureAmount: number;
  noOfMonths: number;
  startDate: Date;
  maturityAmount: number;
  interestRate: number;
}

@Component({
  selector: 'app-farmer-rd-details',
  templateUrl: './farmer-rd-details.page.html',
  styleUrls: ['./farmer-rd-details.page.scss'],
})
export class FarmerRdDetailsPage implements OnInit {
  farmerRDDetails = [
    {
      id: 1,
      farmerName: 'John Doe',
      tenureAmount: 1000,
      noOfMonths: 12,
      startDate: new Date(),
      maturityAmount: 1200,
      interestRate: 10,
    },
    {
      id: 2,
      farmerName: 'Jane Smith',
      tenureAmount: 1500,
      noOfMonths: 18,
      startDate: new Date(),
      maturityAmount: 1800,
      interestRate: 12,
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections: FarmerRDDetail[] = [];
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

  get filteredCollections(): FarmerRDDetail[] {
    return this.farmerRDDetails.filter(detail =>
      detail.farmerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCollections.length / this.entriesToShow);
    this.paginateCollections();
  }

  paginateCollections() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedCollections = this.filteredCollections.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCollections();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCollections();
    }
  }

  async openAddFarmerRDModal() {
    const modal = await this.modalController.create({
      component: AddFarmerRdDetailModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.farmerRDDetails.push({
        id: this.farmerRDDetails.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editRDDetail(rdDetail: { id: number }) {
    const modal = await this.modalController.create({
      component: AddFarmerRdDetailModalComponent,
      componentProps: { rdDetail },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.farmerRDDetails.findIndex(detail => detail.id === rdDetail.id);
      if (index !== -1) {
        this.farmerRDDetails[index] = { id: rdDetail.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteRDDetail(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this RD detail?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.farmerRDDetails = this.farmerRDDetails.filter(detail => detail.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
