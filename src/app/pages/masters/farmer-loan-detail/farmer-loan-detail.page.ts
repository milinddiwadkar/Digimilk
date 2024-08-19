import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddFarmerLoanModalComponent } from '../../../components/add-farmer-loan-modal/add-farmer-loan-modal.component';

interface FarmerLoan {
  farmerName: string;
  loanAccountNo: string;
  loanAmount: number;
  interestRate: number;
  noOfEmi: number;
  emi: number;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-farmer-loan-detail',
  templateUrl: './farmer-loan-detail.page.html',
  styleUrls: ['./farmer-loan-detail.page.scss'],
})
export class FarmerLoanDetailPage implements OnInit {
  loans: FarmerLoan[] = [];
  filteredLoans: FarmerLoan[] = [];
  paginatedLoans: FarmerLoan[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1; // Add totalPages to handle pagination

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    // Example data - replace with data from a service
    this.loans = [
      {
        farmerName: 'John Doe',
        loanAccountNo: '123456',
        loanAmount: 50000,
        interestRate: 5,
        noOfEmi: 10,
        emi: 5000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-01-01'),
      },
      // More data...
    ];

    this.applyFilters();
  }

  applyFilters() {
    this.filteredLoans = this.loans.filter(loan =>
      loan.farmerName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredLoans.length / this.entriesToShow);
    this.paginateLoans();
  }

  paginateLoans() {
    const start = (this.currentPage - 1) * this.entriesToShow;
    const end = start + this.entriesToShow;
    this.paginatedLoans = this.filteredLoans.slice(start, end);
  }

  onEntriesChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  openAddFarmerLoanModal() {
    this.modalCtrl.create({
      component: AddFarmerLoanModalComponent
    }).then(modal => {
      modal.onDidDismiss().then(result => {
        if (result.data) {
          this.loans.push(result.data);
          this.applyFilters();
        }
      });
      modal.present();
    });
  }

  openEditModal(item: FarmerLoan) {
    this.modalCtrl.create({
      component: AddFarmerLoanModalComponent,
      componentProps: { loan: item }
    }).then(modal => {
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const index = this.loans.findIndex(loan => loan.loanAccountNo === result.data.loanAccountNo);
          if (index !== -1) {
            this.loans[index] = result.data;
            this.applyFilters();
          }
        }
      });
      modal.present();
    });
  }

  deleteLoan(item: FarmerLoan) {
    const index = this.loans.findIndex(loan => loan.loanAccountNo === item.loanAccountNo);
    if (index !== -1) {
      this.loans.splice(index, 1);
      this.applyFilters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateLoans();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateLoans();
    }
  }
}
