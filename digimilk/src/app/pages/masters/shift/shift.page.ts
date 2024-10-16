import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddShiftModalComponent } from '../../../components/add-shift-modal/add-shift-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface Shift {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-shift',
  templateUrl: './shift.page.html',
  styleUrls: ['./shift.page.scss'],
})
export class ShiftPage implements OnInit {
  shifts: Shift[] = [
    {
      id: 1,
      name: 'Morning Shift',
      status: 'Active',
      createdAt: new Date(),  // Example timestamp converted to Date
    },
    {
      id: 2,
      name: 'Evening Shift',
      status: 'Inactive',
      createdAt: new Date(),  // Example timestamp converted to Date
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedShifts: Shift[] = [];
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

  get filteredShifts(): Shift[] {
    return this.shifts.filter(shift =>
      shift.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      shift.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredShifts.length / this.entriesToShow);
    this.paginateShifts();
  }

  paginateShifts() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedShifts = this.filteredShifts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateShifts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateShifts();
    }
  }

  async openAddShiftModal() {
    const modal = await this.modalController.create({
      component: AddShiftModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.shifts.push({
        id: this.shifts.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editShift(shift: Shift) {
    const modal = await this.modalController.create({
      component: AddShiftModalComponent,
      componentProps: { shift },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.shifts.findIndex((item) => item.id === shift.id);
      if (index > -1) {
        this.shifts[index] = { id: shift.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteShift(id: number) {
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
            this.shifts = this.shifts.filter((item) => item.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
