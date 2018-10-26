import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private config: ConfigurationService) { }

  /**
   * Login
   */
  postLogin(data) {
    return this.http.post(this.config.apiUrl + '/api/login', data);
  }
  getUserDetails() {
    return this.http.get(this.config.apiUrl + '/api/user', this.config.setHttpHeader());
  }
  /**
   * Login End
   */

  /**
   * Reset Password 
   */
  resetPwdSendEmail(data) {
    return this.http.post(this.config.apiUrl + '/auth/forgotpassword', data);
  }
  validateToken(data) {
    return this.http.post(this.config.apiUrl + '/auth/forgotpassword', data); // UPDATE API URL - FROM SAGAR
  }
  resetPwdUpdatePwd(data) {
    return this.http.post(this.config.apiUrl + '/auth/forgotpassword', data); // UPDATE API URL - FROM SAGAR
  }
  /**
   * Reset Password End
   */

  //get profile details API using access token
  getProfile() {
    return this.http.get(this.config.apiUrl + '/profile', this.config.setHttpHeader());
  }
}