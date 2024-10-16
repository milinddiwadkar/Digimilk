import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRouteModalComponent } from '../../../components/add-route-modal/add-route-modal.component';
import { DarkModeService } from '../../../services/dark-mode';

interface Route {
  id: number;
  name: string;
  driverName: string;
  vehicleNo: string;
  distance: number;
  duration: string;
  status: string;
}

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.page.html',
  styleUrls: ['./route-master.page.scss'],
})
export class RouteMasterPage implements OnInit {
  routes: Route[] = [
    {
      id: 1,
      name: 'Route 1',
      driverName: 'John Doe',
      vehicleNo: 'XYZ 1234',
      distance: 15,
      duration: '1 hour',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Route 2',
      driverName: 'Jane Smith',
      vehicleNo: 'ABC 5678',
      distance: 25,
      duration: '1.5 hours',
      status: 'Inactive',
    },
    // Add more routes as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedRoutes: Route[] = [];
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

  get filteredRoutes(): Route[] {
    return this.routes.filter(route =>
      route.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      route.vehicleNo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRoutes.length / this.entriesToShow);
    this.paginateRoutes();
  }

  paginateRoutes() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedRoutes = this.filteredRoutes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRoutes();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoutes();
    }
  }

  async openAddRouteMasterModal() {
    const modal = await this.modalController.create({
      component: AddRouteModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.routes.push({
        id: this.routes.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }

  async editRoute(route: Route) {
    const modal = await this.modalController.create({
      component: AddRouteModalComponent,
      componentProps: { route },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.routes.findIndex(
        (item) => item.id === route.id
      );
      if (index > -1) {
        this.routes[index] = { id: route.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteRoute(id: number) {
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
            this.routes = this.routes.filter(
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
