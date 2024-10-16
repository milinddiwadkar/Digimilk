import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = 'https://api.example.com/upload'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.uploadUrl, formData).toPromise().then(response => {
      return response.fileUrl; // The URL of the uploaded file returned by the API
    });
  }
}
