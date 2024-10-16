import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddPaymentModalComponent } from '../../components/add-payment-modal/add-payment-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface Payment {
  paymentId: string;
  farmerName: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionId: string;
  status: string;
  description: string;
  societyName: string;
  adjustment: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  payments: Payment[] = [
    {
      paymentId: 'PAY001',
      farmerName: 'John Doe',
      paymentAmount: 200,
      paymentDate: new Date(),
      paymentMethod: 'Bank Transfer',
      transactionId: 'TX123',
      status: 'Completed',
      description: 'Monthly payment',
      societyName: 'Society A',
      adjustment: 'None',
    },
    // Add more payment entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedPayments: Payment[] = [];
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

  get filteredPayments(): Payment[] {
    return this.payments.filter(payment =>
      payment.farmerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      payment.societyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredPayments.length / this.entriesToShow);
    this.paginatePayments();
  }

  paginatePayments() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedPayments = this.filteredPayments.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatePayments();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatePayments();
    }
  }

  async openAddPaymentModal() {
    const modal = await this.modalController.create({
      component: AddPaymentModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.payments.push({
        paymentId: `PAY${this.payments.length + 1}`,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editPayment(payment: Payment) {
    const modal = await this.modalController.create({
      component: AddPaymentModalComponent,
      componentProps: { payment },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.payments.findIndex(item => item.paymentId === payment.paymentId);
      if (index > -1) {
        this.payments[index] = { paymentId: payment.paymentId, ...data };
        this.updatePagination();
      }
    }
  }

  async deletePayment(paymentId: string) {
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
            this.payments = this.payments.filter(item => item.paymentId !== paymentId);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
