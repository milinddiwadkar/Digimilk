import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DarkModeService } from '../services/dark-mode';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router,
    private notificationService: NotificationService

  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });

    this.successMessage = this.notificationService.getMessage();
    this.notificationService.clearMessage();
  }

  async resetPassword() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.authService.resetPassword(this.email).toPromise();
      this.notificationService.setMessage('Password reset link sent to your email.');
      this.successMessage = this.notificationService.getMessage();
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  getErrorMessage(error: any): string {
    // Customize error messages based on your API responses
    if (error.status === 400) {
      return 'Invalid email address.';
    }
    return 'An unexpected error occurred. Please try again.';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
