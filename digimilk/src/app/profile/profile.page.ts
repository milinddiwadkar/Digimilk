import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  adminName: string = 'Prerna';
  adminEmail: string = 'prerna@example.com';
  adminPhone: string = '123-456-7890';
  adminAddress: string = '123 DigiMilk Lane';
  profilePicture: string = 'assets/admin.png'; // Default profile picture
  isUpdating: boolean = false;
  showConfirmation: boolean = false;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

    async updateProfile() {
      this.isUpdating = true;
      // Simulate a profile update with a timeout
      setTimeout(async () => {
        this.isUpdating = false;
        this.showConfirmation = true;
        // Additional logic for actual profile update goes here
      }, 2000);
    }

  goBack() {
    this.router.navigate(['/dashboard']);
  }


  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload here
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async showChangePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change Password',
          handler: (data) => {
            // Handle password change logic
            console.log('Password changed:', data.currentPassword, data.newPassword);
          }
        }
      ]
    });

    await alert.present();
  }

}