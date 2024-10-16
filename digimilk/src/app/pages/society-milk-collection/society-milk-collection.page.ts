import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddSocietyMilkCollectionModalComponent } from '../../components/add-society-milk-collection-modal/add-society-milk-collection-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface MilkCollection {
  id: number; // Add this line
  societyName?: string;
  milkType?: string;
  milkCategory?: string;
  shift?: string;
  snf?: number;
  fat?: number;
  ratePerLitre?: number;
  totalMilk?: number;
  totalAmount?: number;
  createdAt?: Date;
  canId?: string;
}


@Component({
  selector: 'app-society-milk-collection',
  templateUrl: './society-milk-collection.page.html',
  styleUrls: ['./society-milk-collection.page.scss'],
})
export class SocietyMilkCollectionPage implements OnInit {
  milkCollections: MilkCollection[] = [
    {
      id:1,
      societyName: 'Society A',
      milkType: 'Cow',
      milkCategory: 'A',
      shift: 'Morning',
      snf: 8.5,
      fat: 4.5,
      ratePerLitre: 30,
      totalMilk: 20,
      totalAmount: 600,
      canId: 'CAN001',
      createdAt: new Date(),  // Example timestamp converted to Date
    },
    {
      id:2,
      societyName: 'Society B',
      milkType: 'Buffalo',
      milkCategory: 'B',
      shift: 'Evening',
      snf: 9.0,
      fat: 6.0,
      ratePerLitre: 40,
      totalMilk: 15,
      totalAmount: 600,
      canId: 'CAN002',
      createdAt: new Date(),  // Example timestamp converted to Date
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections: MilkCollection[] = [];
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

  get filteredCollections(): MilkCollection[] {
    return this.milkCollections.filter(collection =>
      (collection.societyName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false) ||
      (collection.milkType?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false) ||
      (collection.milkCategory?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false) ||
      (collection.shift?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false)
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

  async openAddSocietyMilkCollectionModal() {
    const modal = await this.modalController.create({
      component: AddSocietyMilkCollectionModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.milkCollections.push({
        id: this.milkCollections.length + 1,
        societyName: 'Default Society', // Ensure this is always provided
        milkType: 'Default Milk Type',
        milkCategory: 'Default Category',
        shift: 'Default Shift',
        fat: 0,
        snf: 0,
        ratePerLitre: 0,
        totalMilk: 0,
        totalAmount: 0,
        createdAt: new Date(),
        canId: 'DEFAULT',
      });
      
      this.updatePagination();
    }
  }

  async editMilkCollection(milkCollection: MilkCollection) {
    const modal = await this.modalController.create({
      component: AddSocietyMilkCollectionModalComponent,
      componentProps: { milkCollection },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.milkCollections.findIndex(
        (item) => item.canId === milkCollection.canId
      );
      if (index > -1) {
        this.milkCollections[index] = { ...data };
        this.updatePagination();
      }
    }
  }

  async deleteMilkCollection(canId: string) {
    if (!canId) {
      // Handle the case where canId is undefined or empty
      return;
    }
  
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
              (item) => item.canId !== canId
            );
            this.updatePagination();
          },
        },
      ],
    });
  
    await alert.present();
  }
  
}
