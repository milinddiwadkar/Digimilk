import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddShiftModalComponent } from '../../../components/add-shift-modal/add-shift-modal.component';

interface Shift {
  shift: string;
  status: boolean;
  createdAt: Date;
}
@Component({
  selector: 'app-shift',
  templateUrl: './shift.page.html',
  styleUrls: ['./shift.page.scss'],
})
export class ShiftPage implements OnInit {

  shifts: Shift[] = [];
  filteredShifts: Shift[] = [];
  paginatedShifts: Shift[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  addShiftForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addShiftForm = this.fb.group({
      shift: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.loadShifts();
  }

  loadShifts() {
    // Example data - replace with data from a service
    this.shifts = [
      { shift: 'Morning', status: true, createdAt: new Date() },
      // Add more shifts here
    ];
    this.filteredShifts = [...this.shifts];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredShifts.length / this.entriesToShow);
    this.paginatedShifts = this.filteredShifts.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddShiftModal() {
    this.modalCtrl.create({
      component: AddShiftModalComponent,
      componentProps: {
        form: this.addShiftForm
      }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newShift: Shift = {
            shift: result.data.shift,
            status: result.data.status,
            createdAt: new Date()
          };
          this.shifts.push(newShift);
          this.filteredShifts = [...this.shifts];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: Shift) {
    // Logic to edit shift
  }

  deleteShift(item: Shift) {
    // Logic to delete shift
    this.shifts = this.shifts.filter(shift => shift !== item);
    this.filteredShifts = [...this.shifts];
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