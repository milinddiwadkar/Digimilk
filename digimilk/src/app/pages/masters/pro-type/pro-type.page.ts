import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProTypeModalComponent } from '../../../components/pro-type-modal/pro-type-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface ProType {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-pro-type',
  templateUrl: './pro-type.page.html',
  styleUrls: ['./pro-type.page.scss'],
})
export class ProTypePage implements OnInit {
  proTypes: ProType[] = [
    {
      id: 1,
      name: 'ProType A',
      status: 'Active',
      createdAt: new Date(), // Example timestamp converted to Date
    },
    {
      id: 2,
      name: 'ProType B',
      status: 'Inactive',
      createdAt: new Date(), // Example timestamp converted to Date
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedProTypes: ProType[] = [];
  totalPages = 1;
  isDarkMode: boolean = false;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private darkModeService: DarkModeService  ) {}

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  get filteredProTypes(): ProType[] {
    return this.proTypes.filter(proType =>
      proType.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      proType.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProTypes.length / this.entriesToShow);
    this.paginateProTypes();
  }

  paginateProTypes() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedProTypes = this.filteredProTypes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProTypes();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProTypes();
    }
  }

  async openAddProTypeModal() {
    const modal = await this.modalController.create({
      component: ProTypeModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.proTypes.push({
        id: this.proTypes.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editProType(proType: ProType) {
    const modal = await this.modalController.create({
      component: ProTypeModalComponent,
      componentProps: { proType },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.proTypes.findIndex(
        (item) => item.id === proType.id
      );
      if (index > -1) {
        this.proTypes[index] = { id: proType.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteProType(id: number) {
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
            this.proTypes = this.proTypes.filter((proType) => proType.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
