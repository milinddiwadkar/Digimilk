import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddWeekModalComponent } from '../../../components/add-week-modal/add-week-modal.component';

interface Week {
  name: string;
  startDate: Date;
  endDate: Date;
  status: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-manage-week',
  templateUrl: './manage-week.page.html',
  styleUrls: ['./manage-week.page.scss'],
})
export class ManageWeekPage implements OnInit {
  weeks: Week[] = [];
  filteredWeeks: Week[] = [];
  paginatedWeeks: Week[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  addWeekForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addWeekForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [true, Validators.required], // Updated to boolean
    });
  }

  ngOnInit() {
    this.loadWeeks();
  }

  loadWeeks() {
    // Example data - replace with data from a service
    this.weeks = [
      { name: 'Week 1', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-07'), status: true, createdAt: new Date() },
      // Add more weeks here
    ];
    this.filteredWeeks = [...this.weeks];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredWeeks.length / this.entriesToShow);
    this.paginatedWeeks = this.filteredWeeks.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddWeekModal() {
    this.modalCtrl.create({
      component: AddWeekModalComponent,
      componentProps: {
        form: this.addWeekForm
      }
    }).then(modal => {
      modal.present();
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newWeek: Week = {
            name: result.data.name,
            startDate: new Date(result.data.startDate),
            endDate: new Date(result.data.endDate),
            status: result.data.status,
            createdAt: new Date() // Example for additional data
          };
          this.weeks.push(newWeek);
          this.filteredWeeks = [...this.weeks];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: Week) {
    // Logic to edit week
  }

  deleteWeek(item: Week) {
    // Logic to delete week
    this.weeks = this.weeks.filter(week => week !== item);
    this.filteredWeeks = [...this.weeks];
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
