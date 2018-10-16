import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  postNewUser(data) {
    return this.http.post('https://startup-mumbai-api-sb.herokuapp.com/auth/signup', data);
  }
}
