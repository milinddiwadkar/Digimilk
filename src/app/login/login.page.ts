import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';  // Ensure this import exists
import { passwordValidator } from '../components/pwd-validator'; // Adjust the path accordingly

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router:Router) {}

  login() {
    if (this.passwordValidator()) {
      // Handle successful login
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character, and be at least 8 characters long.';
    }
  }

  passwordValidator(): boolean {
    const control = { value: this.password };
    const validator = passwordValidator();
    const validationResult = validator(control as any);
    return validationResult === null;
  }
}
