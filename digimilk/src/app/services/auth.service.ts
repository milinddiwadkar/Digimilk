import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';  // Import Firebase from compat
import 'firebase/compat/auth';  // Import Firebase Auth

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleSignIn() {
    throw new Error('Method not implemented.');
  }
  // Facebook login method using popup
  rememberUser(username: string) {
    throw new Error('Method not implemented.');
  }
  user$: Observable<firebase.User | null>;  // Observable for Firebase user state
  private apiUrl = 'https://your-api-url.com'; // Replace with your actual API URL
  private users = [{ username: 'user', password: 'pass' }]; // Example data

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { 
    // Initialize user observable
    this.user$ = this.afAuth.authState as Observable<firebase.User | null>;
  }

  // Google login method using popup
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

  // Facebook login method using popup
  async signInWithFacebook(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        // Redirect to dashboard if login is successful
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Error during Facebook sign-in:', error);
    }
  }

  // Sign out method
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);  // Redirect to login page on sign out
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }

  // Login method for username and password
  login(username: string, password: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      const user = this.users.find(u => u.username === username && u.password === password);
      resolve({ success: !!user });
    });
  }

  // Register method
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      tap(response => {
        // Handle successful registration if needed
      }),
      catchError(this.handleError<any>('register'))
    );
  }

  // Reset password method
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email }).pipe(
      tap(response => {
        // Handle successful password reset if needed
      }),
      catchError(this.handleError<any>('resetPassword'))
    );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
