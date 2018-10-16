import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //login
  postLogin(data) {
    return this.http.post('https://startup-mumbai-api-as.herokuapp.com/api/login', data);
  }

  //get user details using access token
  getUserDetails() {
    var access_token = localStorage.getItem('startup-mumbai')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': access_token
      })
    };
    return this.http.get('https://startup-mumbai-api-as.herokuapp.com/api/me', httpOptions);
  }

  //reset password
  postResetPwd(data) {
    return this.http.get('https://startup-mumbai-api-as.herokuapp.com/api/me', data); 
    //change the rest password url ... sagar
  }
}