import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  apiUrl: String = 'https://startup-mumbai-api-sb.herokuapp.com';

  /**
   * setting access token in the header
   */
  setHttpHeader() {
    var access_token = localStorage.getItem('startup-mumbai')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return httpOptions;
  }

}
