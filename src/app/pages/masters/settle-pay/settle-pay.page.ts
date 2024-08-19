import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddSettlePayModalComponent } from '../../../components/add-settle-pay-modal/add-settle-pay-modal.component';

interface Settlement {
  society: string;
  farmer: string;
  settlementAmount: number;
  settlementDate: Date;
  adjust: string;
}

@Component({
  selector: 'app-settle-pay',
  templateUrl: './settle-pay.page.html',
  styleUrls: ['./settle-pay.page.scss'],
})
export class SettlePayPage implements OnInit {
  settlements: Settlement[] = [];
  filteredSettlements: Settlement[] = [];
  paginatedSettlements: Settlement[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadSettlements();
  }

  loadSettlements() {
    // Example data - replace with data from a service
    this.settlements = [
      { society: 'Society A', farmer: 'Farmer X', settlementAmount: 5000, settlementDate: new Date(), adjust: 'Adjustment 1' },
      // Add more settlements here
    ];
    this.filteredSettlements = [...this.settlements];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSettlements.length / this.entriesToShow);
    this.paginatedSettlements = this.filteredSettlements.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddSettlePayModal() {
    this.modalCtrl.create({
      component: AddSettlePayModalComponent
    }).then(modal => {
      modal.present();
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newSettlement: Settlement = {
            society: result.data.society,
            farmer: result.data.farmer,
            settlementAmount: result.data.settlementAmount,
            settlementDate: result.data.settlementDate,
            adjust: result.data.adjust
          };
          this.settlements.push(newSettlement);
          this.filteredSettlements = [...this.settlements];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: Settlement) {
    // Logic to edit settlement
  }

  deleteSettlement(item: Settlement) {
    this.settlements = this.settlements.filter(settlement => settlement !== item);
    this.filteredSettlements = [...this.settlements];
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
