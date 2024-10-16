import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';  
import { AuthService } from '../services/auth.service';
import { DarkModeService } from '../services/dark-mode';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  errorMessage1: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  termsAccepted: boolean = false;
  passwordStrength: number = 0;
  passwordStrengthText: string = '';
  public isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router,
    private notificationService: NotificationService

  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });

    this.updatePasswordStrength();
this.successMessage = this.notificationService.getMessage();
    this.notificationService.clearMessage();
    }

  async register() {
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.register(this.username, this.email, this.password).toPromise();
      this.notificationService.setMessage('Account created successfully. Please check your email to verify your account.');
      this.successMessage = this.notificationService.getMessage();
            if (!this.termsAccepted) {
        this.errorMessage1 = 'You must agree to the terms and conditions.';
        return;
      }
  
      if (this.passwordValidator()(this.passwordControl) !== null) {
        this.errorMessage = 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character, and be at least 8 characters long.';
        return;
      }

      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  // Custom password validator function
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (
        !/[A-Z]/.test(value) ||    // Check for uppercase letter
        !/[0-9]/.test(value) ||    // Check for number
        !/[\W_]/.test(value) ||    // Check for special character
        value.length < 8           // Check for minimum length
      ) {
        return { invalidPassword: true };
      }
      return null;
    };
  }

  get passwordControl() {
    return {
      value: this.password
    } as AbstractControl;
  }

  updatePasswordStrength() {
    // Simple example; replace with actual strength calculation logic
    if (this.password.length < 8) {
      this.passwordStrength = 0;
      this.passwordStrengthText = 'Weak';
    } else if (this.password.length < 12) {
      this.passwordStrength = 0.5;
      this.passwordStrengthText = 'Moderate';
    } else {
      this.passwordStrength = 1;
      this.passwordStrengthText = 'Strong';
    }
  }

  getErrorMessage(error: any): string {
    // Customize error messages based on your API responses
    if (error.status === 400) {
      return 'Bad Request. Please check your input.';
    }
    if (error.status === 409) {
      return 'Email already in use.';
    }
    return 'An unexpected error occurred. Please try again.';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Password visibility toggle
  togglePasswordVisibility() {
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement | null;
    const icon = document.querySelector('.password-toggle') as HTMLIonIconElement | null;

    if (passwordInput && icon) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.name = 'eye';
      } else {
        passwordInput.type = 'password';
        icon.name = 'eye-off';
      }
    }
  }
}
