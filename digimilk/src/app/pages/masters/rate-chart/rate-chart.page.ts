import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRateModalComponent } from '../../../components/add-rate-modal/add-rate-modal.component';
import { DarkModeService } from '../../../services/dark-mode';
import * as XLSX from 'xlsx'; // Import XLSX library
import { ExcelImportService } from 'src/app/services/excel-import.service'; // Adjust the path as necessary

interface RateCharts {
  id: number;
  milkType: string;
  snf: number;
  fat: number;
  ratePerLitre: number;
  createdAt: Date;
}

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.page.html',
  styleUrls: ['./rate-chart.page.scss'],
})
export class RateChartPage implements OnInit {
  rateCharts: RateCharts[] = [
    {
      id: 1,
      milkType: 'Cow',
      snf: 8.5,
      fat: 4.5,
      ratePerLitre: 30,
      createdAt: new Date(),
    },
    {
      id: 2,
      milkType: 'Buffalo',
      snf: 9.0,
      fat: 6.0,
      ratePerLitre: 40,
      createdAt: new Date(),
    },
    // Add more entries as needed
  ];

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedCharts: RateCharts[] = [];
  totalPages = 1;
  public isDarkMode: boolean = false;


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private darkModeService: DarkModeService,private excelImportService: ExcelImportService
  ) {}

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  get filteredCharts(): RateCharts[] {
    return this.rateCharts.filter(chart =>
      chart.milkType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  
  updatePagination() {
    let filteredUsers = this. rateCharts;
  
    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(rateChart =>
        rateChart.milkType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    this.totalPages = Math.ceil(filteredUsers.length / this.entriesToShow);
    const start = (this.currentPage - 1) * this.entriesToShow;
    const end = start + this.entriesToShow;
    this.paginatedCharts = filteredUsers.slice(start, end);
  }

  paginateCharts() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedCharts = this.filteredCharts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCharts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCharts();
    }
  }
  
  async openAddRateChartModal() {
    const modal = await this.modalController.create({
      component: AddRateModalComponent,
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      // Handle the form data here
      this.rateCharts.push({
        id: this.rateCharts.length + 1,
        ...data,
      });
      this.updatePagination();
    }
  }
  

  async editRateChart(rateChart: RateCharts) {
    const modal = await this.modalController.create({
      component: AddRateModalComponent,
      componentProps: { rateChart },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.rateCharts.findIndex(
        (item) => item.id === rateChart.id
      );
      if (index > -1) {
        this.rateCharts[index] = { id: rateChart.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteRateChart(id: number) {
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
          role: 'destructive',
          handler: () => {
            this.rateCharts = this.rateCharts.filter(
              (item) => item.id !== id
            );
            this.updatePagination();
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmExport() {
    console.log("EXPORTING")
    const alert = await this.alertController.create({
      header: 'Confirm Export',
      message: 'Are you sure you want to export the data to Excel?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Export canceled');
          }
        },
        {
          text: 'Export',
          handler: () => {
            this.exportToExcel();
          }
        }
      ]
    });

    await alert.present();
  }


  exportToExcel() {
    // Convert your user data to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rateCharts);

    // Create a new workbook and add the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RateChart');

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'rateChart_data.xlsx');
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelImportService.readExcelFile(file)
        .then((data: any[]) => {
          console.log('Imported Data:', data);
  
          // Check if data is available
          if (data.length > 0) {
            const headers = data[0];
            this.rateCharts= data.slice(1).map((row: any[]) => {
              return {
                id: row[0],
                milkType: row[1],
                snf: row[2],
                fat: row[3],
                ratePerLitre: row[4],
                createdAt: new Date(row[5]) // Ensure this is a valid date
              };
            });
  
            // Log  rateCharts for debugging
            console.log('Processed Users:', this. rateCharts);
  
            // Update pagination
            this.updatePagination();
          } else {
            console.log('No data found in the file.');
          }
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
  
  
  // Utility method to check if a date is valid
  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }
}


