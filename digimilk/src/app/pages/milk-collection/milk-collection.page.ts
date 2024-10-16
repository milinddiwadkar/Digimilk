import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddMilkCollectionModalComponent } from '../../components/add-milk-collection-modal/add-milk-collection-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface milkCollections {
  id:number;
  farmerName: string;
  milkType: string;
  milkCategory: string;
  shift: string;
  fat: number;
  snf: number;
  ratePerLitre: number;
  totalMilk: number;
  totalAmount: number;
  createdAt: Date;
  canId: string;
}

@Component({
  selector: 'app-milk-collection',
  templateUrl: './milk-collection.page.html',
  styleUrls: ['./milk-collection.page.scss'],
})
export class MilkCollectionPage implements OnInit {
  milkCollections = [
    {
      id: 1,
      farmerName: 'John Doe',
      milkType: 'Cow',
      milkCategory: 'A',
      shift: 'Morning',
      fat: 4.5,
      snf: 8.5,
      ratePerLitre: 30,
      totalMilk: 20,
      totalAmount: 600,
      createdAt: new Date(),  // Example timestamp converted to Date
      canId: 'CAN001',
    },
    {
      id: 2,
      farmerName: 'Jane Smith',
      milkType: 'Buffalo',
      milkCategory: 'B',
      shift: 'Evening',
      fat: 6.0,
      snf: 9.0,
      ratePerLitre: 40,
      totalMilk: 15,
      totalAmount: 600,
      createdAt: new Date(),  // Example timestamp converted to Date
      canId: 'CAN002',
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections:milkCollections[] = [];
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

  get filteredCollections():milkCollections[] {
    return this.milkCollections.filter(collection =>
      collection.farmerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      collection.milkType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      collection.milkCategory.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      collection.shift.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  async openAddMilkCollectionModal() {
    const modal = await this.modalController.create({
      component: AddMilkCollectionModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.milkCollections.push({
        id: this.milkCollections.length + 1,
        ...data,
      });
      this.updatePagination();

    }
  }

  async editMilkCollection(milkCollection: { id: number; }) {
    const modal = await this.modalController.create({
      component: AddMilkCollectionModalComponent,
      componentProps: { milkCollection },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.milkCollections.findIndex(
        (item) => item.id === milkCollection.id
      );
      if (index > -1) {
        this.milkCollections[index] = { id: milkCollection.id, ...data };
        this.updatePagination();

      }
    }
  }

  async deleteMilkCollection(id: number) {
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
            this.milkCollections = this.milkCollections.filter(
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

 


