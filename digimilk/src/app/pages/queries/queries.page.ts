import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddQueryModalComponent } from '../../components/add-query-modal/add-query-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface Query {
  id: number;
  farmerName: string;
  farmerMobileNo: string;
  query: string;
  createdAt: Date;
}

@Component({
  selector: 'app-queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {
  queries: Query[] = [
    {
      id: 1,
      farmerName: 'John Doe',
      farmerMobileNo: '1234567890',
      query: 'Issue with milk collection',
      createdAt: new Date(),
    },
    {
      id: 2,
      farmerName: 'Jane Smith',
      farmerMobileNo: '0987654321',
      query: 'Milk quality concerns',
      createdAt: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedQueries: Query[] = [];
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

  get filteredQueries(): Query[] {
    return this.queries.filter(query =>
      query.farmerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      query.farmerMobileNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredQueries.length / this.entriesToShow);
    this.paginateQueries();
  }

  paginateQueries() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedQueries = this.filteredQueries.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateQueries();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateQueries();
    }
  }

  async openAddQueryModal() {
    const modal = await this.modalController.create({
      component: AddQueryModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.queries.push({
        id: this.queries.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editQuery(query: Query) {
    const modal = await this.modalController.create({
      component: AddQueryModalComponent,
      componentProps: { query },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.queries.findIndex(
        (item) => item.id === query.id
      );
      if (index > -1) {
        this.queries[index] = { id: query.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteQuery(id: number) {
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
            this.queries = this.queries.filter(
              (item) => item.id !== id
            );
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }
}
