import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; //third party plugin
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform = true;
  recoverform = false;

  user$: Object = {};
  data$: Object = {};

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  showRecoverForm() {
  	this.loginform = !this.loginform;
  	this.recoverform = !this.recoverform;
  }

  onLogin() {
    console.log("Logged in");
    this.data.postLogin(this.user$).subscribe(data => this.data$ = data);
  }
}
