import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform = true;
  recoverform = false;

  user$: Object = {};

  constructor() { }

  ngOnInit() {
  }

  showRecoverForm() {
  	this.loginform = !this.loginform;
  	this.recoverform = !this.recoverform;
  }

  onLogin() {
    console.log("Logged in");
  }
}
