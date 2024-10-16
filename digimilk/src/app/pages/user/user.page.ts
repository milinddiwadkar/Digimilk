import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserModalComponent } from '../../components/add-user-modal/add-user-modal.component';
import { DarkModeService } from '../../services/dark-mode';
import { ExcelImportService } from 'src/app/services/excel-import.service'; // Adjust the path as necessary
import * as XLSX from 'xlsx'; // Import the XLSX library

interface User {
  id: number;
  userName: string;
  emailId: string;
  userId: string;
  mobile: string;
  role: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-users',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  users: User[] = [
    { id: 1, userName: 'John Doe', emailId: 'john@example.com', userId: "john@example.com", mobile: '9876543210', role: 'Union', status: 'Active', createdAt: new Date() },
    { id: 2, userName: 'Jane Doe', emailId: 'jane@example.com', userId: "jane@example.com", mobile: '8765432109', role: 'Supervisor', status: 'Active', createdAt: new Date() },
    { id: 3, userName: 'Jane Doe', emailId: 'jane@example.com', userId: "jane@example.com", mobile: '8765432109', role: 'Society', status: 'Active', createdAt: new Date() },
    { id: 4, userName: 'Jane Doe', emailId: 'jane@example.com', userId: "jane@example.com", mobile: '8765432109', role: 'Farmer', status: 'Active', createdAt: new Date() },
    // Add more user objects here
  ];

  paginatedUsers: User[] = [];
  roles: string[] = ['Union', 'Supervisor', 'Society', 'Farmer']; // List of roles
  selectedRole: string = '';
  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  totalPages = 1;
  public isDarkMode: boolean = false;

  addUserForm: FormGroup;

  constructor(private excelImportService: ExcelImportService,private modalController: ModalController, private alertController: AlertController, private fb: FormBuilder, private darkModeService: DarkModeService) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });

  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      (!this.selectedRole || user.role === this.selectedRole) &&  // Apply role filter
      (
        user.userName?.toLowerCase().includes(this.searchTerm?.toLowerCase() || '') ||
        user.emailId?.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
        user.mobile?.includes(this.searchTerm) ||
        user.status?.toLowerCase().includes(this.searchTerm?.toLowerCase())
      )
    );
  }

  updatePagination() {
    let filteredUsers = this.users;
  
    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.emailId.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    if (this.selectedRole) {
      filteredUsers = filteredUsers.filter(user => user.role === this.selectedRole);
    }
  
    this.totalPages = Math.ceil(filteredUsers.length / this.entriesToShow);
    const start = (this.currentPage - 1) * this.entriesToShow;
    const end = start + this.entriesToShow;
    this.paginatedUsers = filteredUsers.slice(start, end);
  }
  

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  async openAddUserModal(user?: User) {
    const modal = await this.modalController.create({
      component: AddUserModalComponent,
      componentProps: { user },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (user) {
        const index = this.users.findIndex(item => item.id === user.id);
        if (index > -1) {
          this.users[index] = { ...this.users[index], ...data };
        }
      } else {
        this.users.push({
          id: this.users.length + 1,
          ...data,
        });
      }
      this.updatePagination();
    }
  }

  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: AddUserModalComponent,
      componentProps: { user },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.users.findIndex(item => item.id === user.id);
      if (index > -1) {
        this.users[index] = { id: user.id, ...data };
        this.updatePagination();
      }
    }
  }

  async deleteUser(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.users = this.users.filter((item) => item.id !== id);
            this.updatePagination();
          },
        },
      ],
    });

    await alert.present();
  }

  filterByRole(event: any) {
    const role = event.detail.value;
    this.selectedRole = role;  // Save selected role
    this.updatePagination();
  }

  changePassword(user: any) {
    // Implement change password logic
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);

    // Create a new workbook and add the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'users_data.xlsx');
  }


  // src/app/pages/user/user.page.ts
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelImportService.readExcelFile(file)
        .then((data: any[]) => {
          console.log('Imported Data:', data);
  
          // Check if data is available
          if (data.length > 0) {
            const headers = data[0];
            this.users = data.slice(1).map((row: any[]) => {
              return {
                id: row[0],
                userName: row[1],
                emailId: row[2],
                userId: row[3],
                mobile: row[4],
                role: row[5],
                status: row[6],
                createdAt: new Date(row[7]) // Ensure this is a valid date
              };
            });
  
            // Log users for debugging
            console.log('Processed Users:', this.users);
  
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
