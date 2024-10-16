import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userProfile = {
    email: '',
    phone: '',
    address: '',
    profilePicture: ''
  };
  isDarkMode = false;
  selectedLanguage = 'en';
  notificationPreference = 'email';
  isTwoFactorEnabled = false;
  profilePicture: string = 'assets/admin.png'; // Default profile picture
  
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private darkModeService: DarkModeService
  ) { }

  async ngOnInit() {
    try {
      const profile = await this.userService.getUserProfile();
      this.userProfile = profile;
      // Set other settings if available in profile
      this.isDarkMode = profile.isDarkMode;
      this.selectedLanguage = profile.language;
      this.notificationPreference = profile.notificationPreference;
      this.isTwoFactorEnabled = profile.isTwoFactorEnabled;
    } catch (error) {
      console.error('Failed to load user profile', error);
    }

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  async updateProfile() {
    try {
      await this.userService.updateProfile(this.userProfile);
      const toast = await this.toastController.create({
        message: 'Profile updated successfully.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  }

  async toggleDarkMode() {
    try {
      await this.darkModeService.updateDarkMode(this.isDarkMode);
    } catch (error) {
      console.error('Failed to update dark mode', error);
    }
  }

  async updateLanguage(event: any) {
    const language = event.detail.value;
    try {
      await this.userService.updateLanguage(language);
    } catch (error) {
      console.error('Failed to update language', error);
    }
  }

  async updateNotificationPreference(event: any) {
    const preference = event.detail.value;
    try {
      await this.userService.updateNotificationPreference(preference);
    } catch (error) {
      console.error('Failed to update notification preference', error);
    }
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
  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  async toggleTwoFactorAuth() {
    try {
      await this.userService.updateTwoFactorAuth(this.isTwoFactorEnabled);
    } catch (error) {
      console.error('Failed to update two-factor authentication', error);
    }
  }

  contactSupport() {
    // Logic to contact support
    // This could open a chat window or send an email
  }

  goToHelpCenter() {
    this.router.navigate(['/help']);
  }

  goBack() {
    this.router.navigate(['/dashboard']); // or the appropriate page
  }
}
