import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddRouteModalComponent } from '../../../components/add-route-modal/add-route-modal.component';

interface Route {
  name: string;
  status: boolean;
  vehicleNumber: string;
  driverNumber: string;
  driverName: string;
  distance: string;
  duration: string;
  createdAt: Date;
}

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.page.html',
  styleUrls: ['./route-master.page.scss'],
})
export class RouteMasterPage implements OnInit {
  routes: Route[] = [];
  filteredRoutes: Route[] = [];
  paginatedRoutes: Route[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  addRouteForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addRouteForm = this.fb.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      vehicleNumber: ['', Validators.required],
      driverNumber: ['', Validators.required],
      driverName: ['', Validators.required],
      distance: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadRoutes();
  }

  loadRoutes() {
    // Example data - replace with data from a service
    this.routes = [
      { name: 'Route 1', status: true, vehicleNumber: 'AB123', driverNumber: '1234567890', driverName: 'John Doe', distance: '10 Km', duration: '30 mins', createdAt: new Date() },
      // Add more routes here
    ];
    this.filteredRoutes = [...this.routes];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRoutes.length / this.entriesToShow);
    this.paginatedRoutes = this.filteredRoutes.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddRouteModal() {
    this.modalCtrl.create({
      component: AddRouteModalComponent,
      componentProps: {
        form: this.addRouteForm
      }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newRoute: Route = {
            name: result.data.name,
            status: result.data.status,
            vehicleNumber: result.data.vehicleNumber,
            driverNumber: result.data.driverNumber,
            driverName: result.data.driverName,
            distance: result.data.distance,
            duration: result.data.duration,
            createdAt: new Date()
          };
          this.routes.push(newRoute);
          this.filteredRoutes = [...this.routes];
          this.updatePagination();
        }
      });
    });
  }

  openEditModal(item: Route) {
    // Logic for opening the edit modal with the selected item
  }

  deleteRoute(item: Route) {
    // Logic for deleting the selected route
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onEntriesChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }
}
