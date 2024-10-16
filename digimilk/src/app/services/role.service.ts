// // role.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleService {
//   private apiUrl = 'https://api.example.com/roles'; // Adjust to your API endpoint

//   constructor(private http: HttpClient) {}

//   // Method to update a role
//   updateRole(id: number, roleData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, roleData);
//   }

//   // Method to add a new role (if needed)
//   addRole(roleData: any): Observable<any> {
//     return this.http.post(this.apiUrl, roleData);
//   }
// }
