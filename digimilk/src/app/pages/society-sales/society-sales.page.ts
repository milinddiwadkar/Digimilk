import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddSocietySalesModalComponent } from '../../components/add-society-sales-modal/add-society-sales-modal.component';
import { DarkModeService } from '../../services/dark-mode';


// Define the interface for your collection items
interface SocietySales{
  id:number;
  invoice_id: number;
  customer_id: string;
  invoice_date: Date;
  total_amount: number;
  due_date:Date;
  status: string;
  org_id: string;
  created_by: string;
  createdAT: Date;
}


@Component({
  selector: 'app-society-sales',
  templateUrl: './society-sales.page.html',
  styleUrls: ['./society-sales.page.scss'],
})
export class SocietySalesPage implements OnInit {
  societySales = [
    {
      id:1,
      invoice_id: 1,
      customer_id: '2',
      invoice_date: new Date(),
      total_amount: 20,
      due_date: new Date(),
      status: 'Inactive',
      org_id: '2',
      created_by: 'Raju',
      createdAT: new Date(),
    },
    {
      id:2,
      invoice_id: 2,
      customer_id: '3',
      invoice_date:new Date(),
      total_amount: 30,
      due_date: new Date(),
      status: 'Active',
      org_id: '3',
      created_by: 'Anil',
      createdAT: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCollections:SocietySales[] = [];
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

  get filteredCollections():SocietySales[] {
    return this.societySales.filter((collection) =>
      collection.invoice_id.toString().includes(this.searchTerm.toLowerCase()) ||
      collection.customer_id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      collection.org_id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      collection.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCollections.length / this.entriesToShow);
    this.paginateCollections();
  }

  paginateCollections() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedCollections = this.filteredCollections.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCollections();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCollections();
    }
  }

  async openAddSocietySalesModal() {
    const modal = await this.modalController.create({
      component: AddSocietySalesModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.societySales.push({
        id: this.editSocietySale.length + 1,
        ...data,
      });
      this.updatePagination();

    }
  }

  async editSocietySale(societySales: SocietySales)  
{
    const modal = await this.modalController.create({
      component: AddSocietySalesModalComponent,
      componentProps: { societySales },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.societySales.findIndex(
        (item) => item.invoice_id === societySales.id
      );
      if (index > -1) {
        this.societySales[index] = { ...this.societySales[index], ...data };
        this.updatePagination();

      }
    }
  }

  async deleteSocietySale(id: number) {
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
            this.societySales = this.societySales.filter(
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

 


