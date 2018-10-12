import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //login
  postLogin(data) {
    return this.http.post('http://localhost:3000/api/login', data);
  }
}