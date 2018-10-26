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

  /**
   * Login
   */
  postLogin(data) {
    return this.http.post(this.apiUrl + '/api/login', data);
  }
  getUserDetails() {
    var access_token = localStorage.getItem('startup-mumbai')
    return this.http.get(this.apiUrl + '/api/user', this.setHttpHeader(access_token));
  }
  /**
   * Login End
   */

  /**
   * Reset Password 
   */
  resetPwdSendEmail(data) {
    return this.http.post(this.apiUrl + '/auth/forgotpassword', data);
  }
  validateToken(data) {
    return this.http.post(this.apiUrl + '/auth/forgotpassword', data); // UPDATE API URL - FROM SAGAR
  }
  resetPwdUpdatePwd(data) {
    return this.http.post(this.apiUrl + '/auth/forgotpassword', data); // UPDATE API URL - FROM SAGAR
  }
  /**
   * Reset Password End
   */

  //get profile details API using access token
  getProfile() {
    var access_token = localStorage.getItem('startup-mumbai');
    return this.http.get(this.apiUrl + '/profile', this.setHttpHeader(access_token));
  }

  /**
   * setting access token in the header
   */
  setHttpHeader(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }
}