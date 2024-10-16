import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/user'; // Replace with your API URL
  updateDarkMode: any;
  updateTwoFactorAuth: any;

  constructor(private http: HttpClient) {}

   // Method to update user profile
   updateProfile(profileData: { email: string; phone: string; profilePicture: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, profileData);
  }

  getUserProfile(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`).toPromise();
  }

  updateNotificationPreference(preference: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/preferences/notifications`, { preference });
  }

  updateLanguage(language: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/preferences/language`, { language });
  }

  updateProfilePicture(pictureUrl: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profile/picture`, { pictureUrl });
  }
}
