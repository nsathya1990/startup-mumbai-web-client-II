import { Observable, Subscription } from 'rxjs/Rx'; //third party plugin
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  userDetails$: Object = {};
  access_token: String;

  constructor(private data: DataService, private toastrService: ToastrService, private router: Router) {
  }

  ngOnInit() {

    //checking if the user is logged-in
    var access_token = localStorage.getItem('startup-mumbai');
    if (!access_token) {
      this.router.navigate(['/login']);
    }
    else {
      this.navigateNextPage();
    }
  }

  showRecoverNLoginForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  onLogin() {
    this.data.postLogin(this.user$).subscribe(data => {

      this.data$ = data;
      //success ... store access token
      if (this.data$['status'] == 200) {
        console.log("[SUCCESS]data$:", this.data$);
        localStorage.setItem('startup-mumbai', this.data$['token']);
        this.toastrService.success(this.data$['message'], 'SUCCESS');
        this.navigateNextPage();
      }
      //email-id not registered or password mismatch
      else if (this.data$['status'] == 404) {
        console.log("this.data$:", this.data$);
        this.toastrService.error(this.data$['message'], "ERROR");
      }
      else {
        console.log("status:", this.data$['status']);
        this.toastrService.error(this.data$['message'], "ERROR");
      }
    }, (error) => {
      // any other error from server
      console.log("error.status:", error.status);
      this.toastrService.error(error['message'], "ERROR");
    });
  }

  resetPassword() {
    var email$: Object = {
      "email": this.user$['reset_emailid']
    };
    this.data.postResetPwdSendEmail(email$).subscribe(data => {
      this.data$ = data;
      if (this.data$['status'] == 200) {
        console.log("this.data$:", this.data$);
        this.toastrService.success(this.data$['message'], 'SUCCESS');
        return this.showRecoverNLoginForm();
      }
      else {
        console.log("this.data$:", this.data$);
        this.toastrService.error(this.data$['message'], "ERROR");
      }
    }, (error) => {
      console.log("error:", error);
      console.log("error.status:", error.status);
      this.toastrService.error(this.data$['message'], "ERROR");
    });
  }

  navigateNextPage() {
    this.data.getUserDetails().subscribe(data => {
      this.user$ = data;
      console.log("this.user$:", this.user$);
      if (this.user$['profileType'].length > 0)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/create-profile']);
    }, (error) => {
      console.log("error:", error);
      this.router.navigate(['/home']);
    });
  }
}