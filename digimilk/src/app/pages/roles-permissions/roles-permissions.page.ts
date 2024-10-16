import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EditRoleModalComponent } from '../../components/edit-role-modal/edit-role-modal.component';
import { DarkModeService } from '../../services/dark-mode';

interface Role {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.page.html',
  styleUrls: ['./roles-permissions.page.scss'],
})
export class RolesPermissionsPage implements OnInit {
  roles: Role[] = [
    { id: 1, name: 'Union', status: 'Active' },
    { id: 2, name: 'Head Doctor', status: 'Active' },
    { id: 3, name: 'Department Head', status: 'Active' },
    { id: 4, name: 'Doctors', status: 'Active' },
    { id: 5, name: 'Executes', status: 'Active' },
    { id: 6, name: 'Supervisor', status: 'Active' },
    { id: 7, name: 'Society', status: 'Active' },
    { id: 8, name: 'Farmer', status: 'Active' },
    { id: 9, name: 'Lab', status: 'Active' },
    { id: 10, name: 'Transporter', status: 'Active' },
    { id: 11, name: 'MCC', status: 'Active' },
  ]

  searchTerm = '';
  entriesToShow = 5;
  currentPage = 1;
  paginatedRoles: Role[] = [];
  totalPages = 1;
  public isDarkMode: boolean = false;


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private  darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.updatePagination();

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  get filteredRoles(): Role[] {
    return this.roles.filter(role =>
      role.name?.toLowerCase().includes(this.searchTerm?.toLowerCase() || "") ||
      role.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.entriesToShow);
    this.paginateRoles();
  }

  paginateRoles() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;
    this.paginatedRoles = this.filteredRoles.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRoles();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoles();
    }
  }

  async openEditRoleModal(role?: Role) {
    const modal = await this.modalController.create({
      component: EditRoleModalComponent,
      componentProps: { role },
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (role) {
        const index = this.roles.findIndex(item => item.id === role.id);
        if (index > -1) {
          this.roles[index] = { id: role.id, ...data };
        }
      } else {
        this.roles.push({
          id: this.roles.length + 1,
          ...data,
        });
      }
      this.updatePagination();
    }
  }
  async editRole(role: Role) {
    // Create the modal and pass the selected role as a component property
    const modal = await this.modalController.create({
      component: EditRoleModalComponent,
      componentProps: { role },
    });
    
    // Present the modal
    await modal.present();
  
    // Wait for the modal to be dismissed and capture the returned data
    const { data } = await modal.onWillDismiss();
    
    // If data was returned (i.e., the user submitted the form)
    if (data) {
      // Find the index of the role in the roles list
      const index = this.roles.findIndex((item) => item.id === role.id);
      
      // If the role exists in the list, update it with the new data
      if (index > -1) {
        this.roles[index] = { id: role.id, ...data };
        
        // Optionally update pagination or other aspects of the UI
        this.updatePagination();
      }
    }
  }
  

  async deleteRole(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this role?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.roles = this.roles.filter(
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
