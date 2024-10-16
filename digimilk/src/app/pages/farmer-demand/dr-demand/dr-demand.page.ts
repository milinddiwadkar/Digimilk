import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddDrDemandModalComponent } from '../../../components/add-dr-demand-modal/add-dr-demand-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface DrDemand {
  clinicId: string;
  clinicName: string;
  drName: string;
  phoneNo: string;
  email: string;
  speciality: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-dr-demand',
  templateUrl: './dr-demand.page.html',
  styleUrls: ['./dr-demand.page.scss'],
})
export class DrDemandPage implements OnInit {
  drDemands: DrDemand[] = [
    {
      clinicId: 'CL001',
      clinicName: 'Health Clinic',
      drName: 'Dr. Smith',
      phoneNo: '1234567890',
      email: 'dr.smith@clinic.com',
      speciality: 'Cardiology',
      status: 'Active',
      createdAt: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections: DrDemand[] = [];
  totalPages = 1;
  public isDarkMode: boolean = false;

  constructor(private modalController: ModalController, private alertController: AlertController,private darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  get filteredCollections(): DrDemand[] {
    return this.drDemands.filter(demand =>
      demand.clinicName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.drName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.speciality.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demand.status.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  async openAddDrDemandModal() {
    const modal = await this.modalController.create({
      component: AddDrDemandModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.drDemands.push({
        clinicId: `CL${this.drDemands.length + 1}`,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editDrDemand(drDemand: DrDemand) {
    const modal = await this.modalController.create({
      component: AddDrDemandModalComponent,
      componentProps: { drDemand },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.drDemands.findIndex(demand => demand.clinicId === drDemand.clinicId);
      if (index > -1) {
        this.drDemands[index] = { clinicId: drDemand.clinicId, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteDrDemand(clinicId: string) {
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
            this.drDemands = this.drDemands.filter(demand => demand.clinicId !== clinicId);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
