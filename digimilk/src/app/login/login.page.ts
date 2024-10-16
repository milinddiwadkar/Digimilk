import { Component } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Your authentication service
import { LoadingController } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginWithGoogle() {
    throw new Error('Method not implemented.');
    }
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false; 
  public isDarkMode: boolean = false;

  constructor(private faio: FingerprintAIO, private afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private loadingCtrl: LoadingController, private darkModeService: DarkModeService) { }


  authenticate() {
    this.faio.show({
      title: 'Biometric Authentication',
      description: 'Please authenticate',
      fallbackButtonTitle: 'Use Backup',
      disableBackup: false,
    })
    .then((result: any) => {
      console.log('Authentication Successful!', result);
    })
    .catch((error: any) => {
      console.error('Authentication Failed', error);
    });
  }
  
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
  async login() {
    this.isLoading = true;
    try {
      await this.authService.login(this.username, this.password);
      if (this.rememberMe) {
        this.authService.rememberUser(this.username);
      }
      if (this.passwordValidator()(this.passwordControl) === null) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character, and be at least 8 characters long.';
      }
    } catch (error) {
      this.errorMessage = 'Invalid username or password.';
    } finally {
      this.isLoading = false;
    }
  }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        // Redirect to dashboard if login is successful
        this.router.navigate(['/dashboard']);  // Ensure '/dashboard' is a valid route in your app
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  }
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);  // Redirect to login page on sign-out
    } catch (error) {
      console.error('Error during Sign-Out:', error);
    }
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
    this.authService.googleSignIn();
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook();
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


  // password toggle
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
