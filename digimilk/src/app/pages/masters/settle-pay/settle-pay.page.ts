import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddSettlePayModalComponent } from '../../../components/add-settle-pay-modal/add-settle-pay-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface SettlePay {
  id: number;
  society: string;
  farmer: string;
  settlementAmount: number;
  settlementDate: Date;
  adjust: string;
}

@Component({
  selector: 'app-settle-pay',
  templateUrl: './settle-pay.page.html',
  styleUrls: ['./settle-pay.page.scss'],
})
export class SettlePayPage implements OnInit {
  settlePays: SettlePay[] = [
    {
      id: 1,
      society: 'Society A',
      farmer: 'Farmer A',
      settlementAmount: 5000,
      settlementDate: new Date(),
      adjust: 'None',
    },
    {
      id: 2,
      society: 'Society B',
      farmer: 'Farmer B',
      settlementAmount: 7000,
      settlementDate: new Date(),
      adjust: 'Adjustment 1',
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections: SettlePay[] = [];
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

  get filteredCollections(): SettlePay[] {
    return this.settlePays.filter(settlePay =>
      settlePay.society.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      settlePay.farmer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      settlePay.adjust.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  async openAddSettlePayModal() {
    const modal = await this.modalController.create({
      component: AddSettlePayModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.settlePays.push({
        id: this.settlePays.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editSettlePay(settlePay: SettlePay) {
    const modal = await this.modalController.create({
      component: AddSettlePayModalComponent,
      componentProps: { settlePay },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.settlePays.findIndex(s => s.id === settlePay.id);
      if (index > -1) {
        this.settlePays[index] = { ...this.settlePays[index], ...data };
        this.updatePagination();
      }
    }
  }

  async deleteSettlePay(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.settlePays = this.settlePays.filter(s => s.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
