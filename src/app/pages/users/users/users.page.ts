import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddUsersPage } from '../add-users/add-users.page'; // Ensure this path is correct
// import { AddUserComponent } from '../../pages/users/add-users/add-user.page';

interface User {
  userName: string;
  emailId: string;
  userId: string;
  mobile: string;
  password: string;
  role: string;
  status: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html', // Ensure this path is correct
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  roles = ['Admin', 'User', 'Manager'];
  selectedRole: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // Load users from your service or data source
    this.users = [
      {
        userName: 'John Doe',
        emailId: 'john.doe@example.com',
        userId: 'jd123',
        mobile: '1234567890',
        password: 'password',
        role: 'Admin',
        status: true,
        createdAt: new Date(),
      },
      // Add more users here
    ];
    this.filteredUsers = [...this.users];
  }

  filterByRole() {
    if (this.selectedRole) {
      this.filteredUsers = this.users.filter((user) => user.role === this.selectedRole);
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  async openAddUserModal() {
    const modal = await this.modalCtrl.create({
      component: AddUsersPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.users.push({ ...(data.data as User), createdAt: new Date() });
        this.filterByRole();
      }
    });

    return await modal.present();
  }

  editUser(user: User) {
    // Logic to edit user
  }

  deleteUser(user: User) {
    // Logic to delete user
  }

  changePassword(user: User) {
    // Logic to change user password
  }

  updateUserDetails(user: User) {
    // Logic to update user details
  }

  importFromExcel() {
    // Logic to import users from Excel
  }
}
