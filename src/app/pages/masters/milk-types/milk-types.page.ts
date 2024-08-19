import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddMilkTypeModalComponent } from '../../../components/add-milk-type-modal/add-milk-type-modal.component';


interface MilkType {
  name: string;
  milkType: string;
  status: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-milk-types',
  templateUrl: './milk-types.page.html',
  styleUrls: ['./milk-types.page.scss'],
})
export class MilkTypesPage implements OnInit {
  milkTypes: MilkType[] = [];
  filteredMilkTypes: MilkType[] = [];
  paginatedMilkTypes: MilkType[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1; // Add totalPages to handle pagination

  addMilkTypeForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addMilkTypeForm = this.fb.group({
      name: ['', Validators.required],
      milkType: ['', Validators.required],
      status: [true, Validators.required], // Updated to boolean
    });
  }

  ngOnInit() {
    console.log("milktype")
    this.loadMilkTypes();
  }

  loadMilkTypes() {
    // Example data - replace with data from a service
    this.milkTypes = [
      { name: 'Full Cream', milkType: 'Cow Milk', status: true, createdAt: new Date() },
      // Add more milk types here
    ];
    this.filteredMilkTypes = [...this.milkTypes];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredMilkTypes.length / this.entriesToShow);
    this.paginatedMilkTypes = this.filteredMilkTypes.slice((this.currentPage - 1) * this.entriesToShow, this.currentPage * this.entriesToShow);
  }

  openAddMilkTypeModal() {
    this.modalCtrl.create({
      component: AddMilkTypeModalComponent,
      componentProps: {
        form: this.addMilkTypeForm
      }
    }).then(modal => {
      modal.present(); // Correct placement of modal.present()
  
      modal.onDidDismiss().then(result => {
        if (result.data) {
          const newMilkType: MilkType = {
            name: result.data.name,
            milkType: result.data.milkType,
            status: result.data.status,
            createdAt: new Date() // Assuming the creation time is now
          };
          this.milkTypes.push(newMilkType);
          this.filteredMilkTypes = [...this.milkTypes];
          this.updatePagination();
        }
      });
    });
  }
  

  openEditModal(item: MilkType) {
    // Logic to edit milk type
  }

  deleteMilkType(item: MilkType) {
    // Logic to delete milk type
    this.milkTypes = this.milkTypes.filter(milkType => milkType !== item);
    this.filteredMilkTypes = [...this.milkTypes];
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