import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddRateModalComponent } from '../../../components/add-rate-modal/add-rate-modal.component';

interface Rate {
  milkType: string;
  snf: number;
  fat: number;
  ratePerLitre: number;
  createdAt: Date;
}

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.page.html',
  styleUrls: ['./rate-chart.page.scss'],
})
export class RateChartPage implements OnInit {
  rates: Rate[] = [];
  filteredRates: Rate[] = [];
  paginatedRates: Rate[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1; // Add totalPages to handle pagination

  addRateForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addRateForm = this.fb.group({
      milkType: ['', Validators.required],
      snf: ['', [Validators.required, Validators.min(0)]],
      fat: ['', [Validators.required, Validators.min(0)]],
      ratePerLitre: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.loadRates();
  }

  loadRates() {
    // Example data - replace with data from a service
    this.rates = [
      { milkType: 'Cow Milk', snf: 8.5, fat: 4.5, ratePerLitre: 50, createdAt: new Date() },
      // Add more rates here
    ];
    this.filteredRates = [...this.rates];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRates.length / this.entriesToShow);
    this.paginatedRates = this.filteredRates.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddRateModal() {
    this.modalCtrl.create({
      component: AddRateModalComponent,
      componentProps: {
        form: this.addRateForm
      }
    }).then(modal => {
      modal.present();
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newRate: Rate = {
            milkType: result.data.milkType,
            snf: result.data.snf,
            fat: result.data.fat,
            ratePerLitre: result.data.ratePerLitre,
            createdAt: new Date() // Assuming the creation time is now
          };
          this.rates.push(newRate);
          this.filteredRates = [...this.rates];
          this.updatePagination();
        }
      });
    });
  }

  importExcel() {
    // Logic to handle Excel import
    console.log('Import Excel functionality not yet implemented');
  }

  openEditModal(item: Rate) {
    // Logic to edit rate
  }

  deleteRate(item: Rate) {
    // Logic to delete rate
    this.rates = this.rates.filter(rate => rate !== item);
    this.filteredRates = [...this.rates];
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
