import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddFarmerLoanModalComponent } from '../../../components/add-farmer-loan-modal/add-farmer-loan-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface LoanDetail {
  id: number;
  farmerName: string;
  loanAccountNo: string;
  loanAmount: number;
  interestRate: number;
  numberOfEMI: number;
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
  loanDetails: LoanDetail[] = [
    {
      id: 1,
      farmerName: 'John Doe',
      loanAccountNo: 'LA001',
      loanAmount: 5000,
      interestRate: 5,
      numberOfEMI: 12,
      emi: 450,
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-01-01'),
    },
    {
      id: 2,
      farmerName: 'Jane Smith',
      loanAccountNo: 'LA002',
      loanAmount: 10000,
      interestRate: 4,
      numberOfEMI: 24,
      emi: 425,
      startDate: new Date('2023-06-01'),
      endDate: new Date('2025-06-01'),
    },
    // Add more loan details as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedLoanDetails: LoanDetail[] = [];
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

  get filteredLoanDetails(): LoanDetail[] {
    return this.loanDetails.filter((loanDetail) =>
      loanDetail.farmerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      loanDetail.loanAccountNo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredLoanDetails.length / this.entriesToShow);
    this.paginateLoanDetails();
  }

  paginateLoanDetails() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedLoanDetails = this.filteredLoanDetails.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateLoanDetails();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateLoanDetails();
    }
  }

  async openAddLoanModal() {
    const modal = await this.modalController.create({
      component: AddFarmerLoanModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.loanDetails.push(data);
      this.updatePagination();
    }
  }

  async editLoanDetail(loanDetail: LoanDetail) {
    const modal = await this.modalController.create({
      component: AddFarmerLoanModalComponent,
      componentProps: { loanDetail },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.loanDetails.findIndex(
        (item) => item.id === loanDetail.id
      );
      if (index > -1) {
        this.loanDetails[index] = { id: loanDetail.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteLoanDetail(loanId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this loan detail?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.loanDetails = this.loanDetails.filter(
              (loanDetail) => loanDetail.id !== loanId
            );
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
