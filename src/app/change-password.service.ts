import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {}

  postChangePassword(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('startup-mumbai')
      })
    };
    return this.http.post('https://startup-mumbai-api-as.herokuapp.com/api/auth/changePassword', data, httpOptions);
  }
}
