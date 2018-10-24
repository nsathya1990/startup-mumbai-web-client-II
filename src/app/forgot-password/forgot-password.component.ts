import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user$: Object = {};
  data$: Object = {};

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    //checking if the user is logged-in
    var access_token = localStorage.getItem('startup-mumbai');
    if (access_token) {
      this.router.navigate(['/home']);
    }
  }

  submitNewPwd() {
    console.log("Inside submitNewPwd()");
    var pwd$: Object = {
      "password": this.user$['password']
    };
    this.data.postForgotPwd_NewPwd(pwd$).subscribe(data => {
      this.data$ = data;
      console.log("this.data$:", this.data$);
    });
  }
}
