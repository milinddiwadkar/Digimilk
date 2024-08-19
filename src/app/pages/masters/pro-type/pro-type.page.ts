import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProTypeModalComponent } from '../../../components/pro-type-modal/pro-type-modal.component';


interface ProType {
  name: string;
  status: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-pro-type',
  templateUrl: './pro-type.page.html',
  styleUrls: ['./pro-type.page.scss'],
})
export class ProTypePage implements OnInit {
  proTypes: ProType[] = [];
  filteredProTypes: ProType[] = [];
  paginatedProTypes: ProType[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1; // Add totalPages to handle pagination

  proTypeForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.proTypeForm = this.fb.group({
      name: ['', Validators.required],
      status: [true, Validators.required], // Updated to boolean
    });
  }

  ngOnInit() {
    this.loadProTypes();
  }

  loadProTypes() {
    // Example data - replace with data from a service
    this.proTypes = [
      { name: 'Full Cream', status: true, createdAt: new Date() },
      // Add more milk types here
    ];
    this.filteredProTypes = [...this.proTypes];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProTypes.length / this.entriesToShow);
    this.paginatedProTypes = this.filteredProTypes.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openProTypeModal() {
    this.modalCtrl.create({
      component: ProTypeModalComponent,
      componentProps: {
        form: this.proTypeForm
      }
    }).then(modal => {
      modal.present(); // Correct placement of modal.present()
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const proType: ProType = {
            name: result.data.name,
            status: result.data.status,
            createdAt: new Date() // Assuming the creation time is now
          };
          this.proTypes.push(proType);
          this.filteredProTypes = [...this.proTypes];
          this.updatePagination();
        }
      });
    });
  }
  

  openEditModal(item: ProType) {
    // Logic to edit milk type
  }

  deleteProType(item: ProType) {
    // Logic to delete milk type
    this.proTypes = this.proTypes.filter(proType =>proType !== item);
    this.filteredProTypes = [...this.proTypes];
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
