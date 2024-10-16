import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddMilkTypeModalComponent } from '../../../components/add-milk-type-modal/add-milk-type-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface MilkType {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-milk-types',
  templateUrl: './milk-types.page.html',
  styleUrls: ['./milk-types.page.scss'],
})
export class MilkTypesPage implements OnInit {
  milkTypes: MilkType[] = [
    {
      id: 1,
      name: 'Cow Milk',
      status: 'Active',
      createdAt: new Date(), // Example timestamp converted to Date
    },
    {
      id: 2,
      name: 'Buffalo Milk',
      status: 'Inactive',
      createdAt: new Date(), // Example timestamp converted to Date
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedMilkTypes: MilkType[] = [];
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

  get filteredMilkTypes(): MilkType[] {
    return this.milkTypes.filter(milkType =>
      milkType.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredMilkTypes.length / this.entriesToShow);
    this.paginateMilkTypes();
  }

  paginateMilkTypes() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedMilkTypes = this.filteredMilkTypes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateMilkTypes();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateMilkTypes();
    }
  }

  async openAddMilkTypeModal() {
    const modal = await this.modalController.create({
      component: AddMilkTypeModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.milkTypes.push({
        id: this.milkTypes.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editMilkType(milkType: MilkType) {
    const modal = await this.modalController.create({
      component: AddMilkTypeModalComponent,
      componentProps: { milkType },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.milkTypes.findIndex(
        (item) => item.id === milkType.id
      );
      if (index > -1) {
        this.milkTypes[index] = { id: milkType.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteMilkType(id: number) {
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
            this.milkTypes = this.milkTypes.filter(
              (item) => item.id !== id
            );
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
