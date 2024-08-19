import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddFarmerRdDetailModalComponent } from '../../../components/add-farmer-rd-detail-modal/add-farmer-rd-detail-modal.component';

interface FarmerRdDetail {
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
  farmerRdDetails: FarmerRdDetail[] = [];
  filteredFarmerRdDetails: FarmerRdDetail[] = [];
  paginatedFarmerRdDetails: FarmerRdDetail[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  addFarmerRdDetailForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addFarmerRdDetailForm = this.fb.group({
      farmerName: ['', Validators.required],
      tenureAmount: ['', [Validators.required, Validators.min(0)]],
      noOfMonths: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      maturityAmount: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.loadFarmerRdDetails();
  }

  loadFarmerRdDetails() {
    // Example data - replace with data from a service
    this.farmerRdDetails = [
      { farmerName: 'John Doe', tenureAmount: 50000, noOfMonths: 12, startDate: new Date(), maturityAmount: 55000, interestRate: 5 },
      // Add more farmer RD details here
    ];
    this.filteredFarmerRdDetails = [...this.farmerRdDetails];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredFarmerRdDetails.length / this.entriesToShow);
    this.paginatedFarmerRdDetails = this.filteredFarmerRdDetails.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddFarmerRdDetailsModal() {
    this.modalCtrl.create({
      component: AddFarmerRdDetailModalComponent,
      componentProps: {
        form: this.addFarmerRdDetailForm
      }
    }).then(modal => {
      modal.present();
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newFarmerRdDetail: FarmerRdDetail = {
            farmerName: result.data.farmerName,
            tenureAmount: result.data.tenureAmount,
            noOfMonths: result.data.noOfMonths,
            startDate: result.data.startDate,
            maturityAmount: result.data.maturityAmount,
            interestRate: result.data.interestRate
          };
          this.farmerRdDetails.push(newFarmerRdDetail);
          this.filteredFarmerRdDetails = [...this.farmerRdDetails];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: FarmerRdDetail) {
    // Logic to edit farmer RD detail
  }

  deleteFarmerRdDetail(item: FarmerRdDetail) {
    this.farmerRdDetails = this.farmerRdDetails.filter(detail => detail !== item);
    this.filteredFarmerRdDetails = [...this.farmerRdDetails];
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
