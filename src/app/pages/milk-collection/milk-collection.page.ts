import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddMilkCollectionModalComponent } from '../../components/add-milk-collection-modal/add-milk-collection-modal.component';

interface MilkCollection {
  farmerName: string;
  milkType: string;
  milkCategory: string;
  shift: string;
  fat: number;
  snf: number;
  ratePerLitre: number;
  totalMilk: number;
  totalAmount: number;
  canId: string;
  createdAt: Date;
}

@Component({
  selector: 'app-milk-collection',
  templateUrl: './milk-collection.page.html',
  styleUrls: ['./milk-collection.page.scss'],
})
export class MilkCollectionPage implements OnInit {
  milkCollections: MilkCollection[] = [];
  filteredMilkCollections: MilkCollection[] = [];
  paginatedMilkCollections: MilkCollection[] = [];
  currentPage = 1;
  entriesToShow = 5;
  searchQuery = '';
  totalPages = 1;

  addMilkCollectionForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addMilkCollectionForm = this.fb.group({
      farmerName: ['', Validators.required],
      milkType: ['', Validators.required],
      milkCategory: ['', Validators.required],
      shift: ['', Validators.required],
      fat: ['', [Validators.required, Validators.min(0)]],
      snf: ['', [Validators.required, Validators.min(0)]],
      ratePerLitre: ['', [Validators.required, Validators.min(0)]],
      totalMilk: ['', [Validators.required, Validators.min(0)]],
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      canId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadMilkCollections();
  }

  loadMilkCollections() {
    // Example data - replace with data from a service
    this.milkCollections = [
      {
        farmerName: 'John Doe',
        milkType: 'Cow Milk',
        milkCategory: 'A',
        shift: 'Morning',
        fat: 3.5,
        snf: 8.5,
        ratePerLitre: 40,
        totalMilk: 100,
        totalAmount: 4000,
        canId: 'CAN001',
        createdAt: new Date(),
      },
      // Add more milk collections here
    ];
    this.filteredMilkCollections = [...this.milkCollections];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredMilkCollections.length / this.entriesToShow);
    this.paginatedMilkCollections = this.filteredMilkCollections.slice(
      (this.currentPage - 1) * this.entriesToShow,
      this.currentPage * this.entriesToShow
    );
  }

  openAddMilkCollectionModal() {
    this.modalCtrl.create({
      component: AddMilkCollectionModalComponent,
      componentProps: {
        form: this.addMilkCollectionForm,
      },
    }).then((modal) => {
      modal.present();

      modal.onDidDismiss().then((result) => {
        if (result.data) {
          const newMilkCollection: MilkCollection = {
            farmerName: result.data.farmerName,
            milkType: result.data.milkType,
            milkCategory: result.data.milkCategory,
            shift: result.data.shift,
            fat: result.data.fat,
            snf: result.data.snf,
            ratePerLitre: result.data.ratePerLitre,
            totalMilk: result.data.totalMilk,
            totalAmount: result.data.totalAmount,
            canId: result.data.canId,
            createdAt: new Date(),
          };
          this.milkCollections.push(newMilkCollection);
          this.filteredMilkCollections = [...this.milkCollections];
          this.updatePagination();
        }
      });
    });
  }

  deleteMilkCollection(item: MilkCollection) {
    this.milkCollections = this.milkCollections.filter((collection) => collection !== item);
    this.filteredMilkCollections = [...this.milkCollections];
    this.updatePagination();
  }

  openEditModal(item: MilkCollection) {
    this.modalCtrl.create({
      component: AddMilkCollectionModalComponent,
      componentProps: {
        form: this.addMilkCollectionForm,
        milkCollection: item,
      },
    }).then((modal) => {
      modal.present();

      modal.onDidDismiss().then((result) => {
        if (result.data) {
          Object.assign(item, result.data);
          this.filteredMilkCollections = [...this.milkCollections];
          this.updatePagination();
        }
      });
    });
  }

  onEntriesChange(event: any) {
    this.currentPage = 1;
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

  importExcel() {
    // Logic for importing Excel will go here
    console.log('Import Excel Clicked');
  }
}
