import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddWeekModalComponent } from '../../../components/add-week-modal/add-week-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface Week {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-manage-week',
  templateUrl: './manage-week.page.html',
  styleUrls: ['./manage-week.page.scss'],
})
export class ManageWeekPage implements OnInit {
  weeks: Week[] = [
    {
      id: 1,
      name: 'Week 1',
      startDate: new Date(2024, 7, 1),
      endDate: new Date(2024, 7, 7),
      status: 'Active',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Week 2',
      startDate: new Date(2024, 7, 8),
      endDate: new Date(2024, 7, 14),
      status: 'Completed',
      createdAt: new Date(),
    },
    // Add more week entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedWeeks: Week[] = [];
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

  get filteredWeeks(): Week[] {
    return this.weeks.filter(week =>
      week.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      week.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredWeeks.length / this.entriesToShow);
    this.paginateWeeks();
  }

  paginateWeeks() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedWeeks = this.filteredWeeks.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateWeeks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateWeeks();
    }
  }

  async openAddWeekModal() {
    const modal = await this.modalController.create({
      component: AddWeekModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.weeks.push({
        id: this.weeks.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editWeek(week: Week) {
    const modal = await this.modalController.create({
      component: AddWeekModalComponent,
      componentProps: { week },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.weeks.findIndex((item) => item.id === week.id);
      if (index > -1) {
        this.weeks[index] = { id: week.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteWeek(id: number) {
    const alert = await this.alertController.create({
      header: 'Delete Week',
      message: 'Are you sure you want to delete this week?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.weeks = this.weeks.filter(week => week.id !== id);
            this.updatePagination();
          },
        },
      ],
    });
    await alert.present();
  }
}
