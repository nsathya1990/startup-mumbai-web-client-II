import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //apiUrl: String = 'https://startup-mumbai-api-sc.herokuapp.com';
  apiUrl: String = 'https://startup-mumbai-api-sb.herokuapp.com';

  constructor(private http: HttpClient) { }

  //login API
  postLogin(data) {
    return this.http.post(this.apiUrl + '/api/login', data);
  }

  //retirieve user details API using access token after login
  getUserDetails() {
    var access_token = localStorage.getItem('startup-mumbai')
    return this.http.get(this.apiUrl + '/api/me', this.getHttpOptions(access_token));
  }

  //reset password API
  postForgotPwd_Email(data) {
    return this.http.post(this.apiUrl + '/auth/forgotpassword', data);
  }
  
  //reset password API
  postForgotPwd_NewPwd(data) {
    return this.http.post(this.apiUrl + '/auth/forgotpassword', data);
  }

  //get profile details API using access token
  getProfile() {
    var access_token = localStorage.getItem('startup-mumbai');
    return this.http.get(this.apiUrl + '/profile', this.getHttpOptions(access_token));
  }

  //setting token in the header
  getHttpOptions(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }
}