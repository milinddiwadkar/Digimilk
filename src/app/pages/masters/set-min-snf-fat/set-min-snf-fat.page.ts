import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddSnfFatModalComponent } from '../../../components/add-snf-fat-modal/add-snf-fat-modal.component';

interface SnfFatSetting {
  milkType: string;
  minSnf: number;
  minFat: number;
  maxSnf: number;
  maxFat: number;
  createdAt: Date;
}

@Component({
  selector: 'app-set-min-snf-fat',
  templateUrl: './set-min-snf-fat.page.html',
  styleUrls: ['./set-min-snf-fat.page.scss'],
})
export class SetMinSnfFatPage implements OnInit {
  snfFatSettings: SnfFatSetting[] = [];
  filteredSnfFatSettings: SnfFatSetting[] = [];
  paginatedSnfFatSettings: SnfFatSetting[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadSnfFatSettings();
  }

  loadSnfFatSettings() {
    // Example data - replace with data from a service
    this.snfFatSettings = [
      { milkType: 'Cow Milk', minSnf: 8.5, minFat: 3.5, maxSnf: 9.0, maxFat: 4.0, createdAt: new Date() },
      // Add more SNF/FAT settings here
    ];
    this.filteredSnfFatSettings = [...this.snfFatSettings];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSnfFatSettings.length / this.entriesToShow);
    this.paginatedSnfFatSettings = this.filteredSnfFatSettings.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddSnfFatModal() {
    this.modalCtrl.create({
      component: AddSnfFatModalComponent
    }).then(modal => {
      modal.present();
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newSnfFatSetting: SnfFatSetting = {
            milkType: result.data.milkType,
            minSnf: result.data.minSnf,
            minFat: result.data.minFat,
            maxSnf: result.data.maxSnf,
            maxFat: result.data.maxFat,
            createdAt: new Date()
          };
          this.snfFatSettings.push(newSnfFatSetting);
          this.filteredSnfFatSettings = [...this.snfFatSettings];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: SnfFatSetting) {
    // Logic to edit SNF/FAT setting
  }

  deleteSnfFatSetting(item: SnfFatSetting) {
    this.snfFatSettings = this.snfFatSettings.filter(setting => setting !== item);
    this.filteredSnfFatSettings = [...this.snfFatSettings];
    this.updatePagination();
  }

  onEntriesChange(event: any) {
    this.entriesToShow = event.detail.value;
    this.updatePagination();
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
}
