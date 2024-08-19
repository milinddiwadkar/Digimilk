import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditRoleModalComponent } from '../../components/edit-role-modal/edit-role-modal.component';


@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.page.html',
  styleUrls: ['./roles-permissions.page.scss'],
})
export class RolesPermissionsPage {
  roles = [
    { id: 1, role: 'Union', status: 'Active' },
    { id: 2, role: 'Head Doctor', status: 'Active' },
    { id: 3, role: 'Department Head', status: 'Active' },
    { id: 4, role: 'Doctors', status: 'Active' },
    { id: 5, role: 'Executes', status: 'Active' },
    { id: 6, role: 'Supervisor', status: 'Active' },
    { id: 7, role: 'Society', status: 'Active' },
    { id: 8, role: 'Farmer', status: 'Active' },
    { id: 9, role: 'Lab', status: 'Active' },
    { id: 10, role: 'Transporter', status: 'Active' },
    { id: 11, role: 'MCC', status: 'Active' },

    // Add more roles as needed
  ];

  searchQuery = '';
  entriesToShow = 10;
  currentPage = 1;
  totalPages = 1;

  constructor(private router: Router, private modalCtrl: ModalController) {
    this.calculateTotalPages();
  }

  async openEditModal(role?: any) {
    const modal = await this.modalCtrl.create({
      component: EditRoleModalComponent,
      componentProps: {
        role: role || null
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Handle the updated data, save changes, or add new role
      }
    });

    return await modal.present();
  }

  get filteredRoles() {
    return this.roles.filter(role =>
      role.role.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedRoles() {
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    return this.filteredRoles.slice(startIndex, startIndex + this.entriesToShow);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.entriesToShow);
  }

  onEntriesChange(event: any) {
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  navigateToForm(roleId: number) {
    this.router.navigate(['/roles-permissions/form', roleId]);
  }
}
