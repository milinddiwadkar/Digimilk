import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSnfFatModalComponent } from '../../../components/add-snf-fat-modal/add-snf-fat-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface SetMinSnfFat {
  id: number;
  milkType: string;
  minSnf: number;
  minFat: number;
  maxSnf: number;
  maxFat: number;
}

@Component({
  selector: 'app-set-min-snf-fat',
  templateUrl: './set-min-snf-fat.page.html',
  styleUrls: ['./set-min-snf-fat.page.scss'],
})
export class SetMinSnfFatPage implements OnInit {
  setMinSnfFats: SetMinSnfFat[] = [
    {
      id: 1,
      milkType: 'Cow Milk',
      minSnf: 8.0,
      minFat: 3.5,
      maxSnf: 8.5,
      maxFat: 4.0,
    },
    {
      id: 2,
      milkType: 'Buffalo Milk',
      minSnf: 9.0,
      minFat: 6.0,
      maxSnf: 9.5,
      maxFat: 6.5,
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedSetMinSnfFats: SetMinSnfFat[] = [];
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

  get filteredSetMinSnfFats(): SetMinSnfFat[] {
    return this.setMinSnfFats.filter(setMinSnfFat =>
      setMinSnfFat.milkType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSetMinSnfFats.length / this.entriesToShow);
    this.paginateSetMinSnfFats();
  }

  paginateSetMinSnfFats() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedSetMinSnfFats = this.filteredSetMinSnfFats.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateSetMinSnfFats();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateSetMinSnfFats();
    }
  }

  async openAddSetMinSnfFatModal() {
    const modal = await this.modalController.create({
      component: AddSnfFatModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.setMinSnfFats.push(data);
      this.updatePagination();
    }
  }

  async editSetMinSnfFat(setMinSnfFat: SetMinSnfFat) {
    const modal = await this.modalController.create({
      component: AddSnfFatModalComponent,
      componentProps: { setMinSnfFat },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.setMinSnfFats.findIndex(item => item.id === data.id);
      if (index > -1) {
        this.setMinSnfFats[index] = { id: setMinSnfFat.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteSetMinSnfFat(id: number) {
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
            this.setMinSnfFats = this.setMinSnfFats.filter(item => item.id !== id);
            this.updatePagination();
          },
        },
      ],
    });
    await alert.present();
  }
}
