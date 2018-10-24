import { Observable, Subscription } from 'rxjs/Rx'; //third party plugin
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
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
  error$: Object = {
    isVisible: Boolean,
    message: String
  };
  success$: Object = {
    title: String,
    message: String
  };
  access_token: String;

  constructor(private data: DataService, private toastaService: ToastaService, private toastaConfig: ToastaConfig, private router: Router) {
    this.toastaConfig.theme = 'default';
  }

  ngOnInit() {

    //checking if the user is logged-in
    var access_token = localStorage.getItem('startup-mumbai');
    if (!access_token) {
      this.router.navigate(['/login']);
    }
    else {
      /* this.data.getUserDetails().subscribe(data => {
        this.router.navigate(['/create-profile']);
      }); */
      this.router.navigate(['/home']);
    }
  }

  showRecoverNLoginForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  errorToast() {
    let title = this.error$['title']
    let message = this.error$['message'];//"Invalid email address/password combination.";
    let interval = 3000;
    let timeout = 7000;
    let seconds = timeout / 1000;
    let subscription: Subscription;
    let toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: timeout,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
        console.log('Toastr ' + toast.id + ' has been added!');
        let observable = Observable.interval(interval).take(seconds);// Run the timer with 1 second iterval
        // Start listen seconds beat
        subscription = observable.subscribe((count: number) => {
          toast.title = title//"Login Error"; // Update title of toast
          toast.msg = message;//"Please enter your correct login credentials"; // Update message of toast
        });
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
        subscription.unsubscribe();// Stop listening
      }
    };
    this.toastaService.error(toastOptions);
  }

  successToast() {
    let title = this.success$['title'];
    let message = this.success$['message'];
    let interval = 2000;
    let timeout = 4000;
    let seconds = timeout / 1000;
    let subscription: Subscription;
    let toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: timeout,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
        console.log('Toastr ' + toast.id + ' has been added!');
        let observable = Observable.interval(interval).take(seconds);// Run the timer with 1 second iterval
        // Start listen seconds beat
        subscription = observable.subscribe((count: number) => {
          toast.title = this.success$['title'];
          toast.msg = "Have a wonderful time ... "; // Update message of toast
        });
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
        subscription.unsubscribe();// Stop listenning
      }
    };
    this.toastaService.success(toastOptions);
  }

  onLogin() {
    this.data.postLogin(this.user$).subscribe(data => {

      this.data$ = data;

      //success ... store access token
      if (this.data$['status'] == 200) {
        console.log("[SUCCESS]data$:", this.data$);
        localStorage.setItem('startup-mumbai', this.data$['token']);
        this.success$['title'] = "Startup Mumbai";
        this.success$['message'] = "Successfully logged-in";
        this.successToast();
        //log-in after 3 seconds, so that we can make the toastr visible. Remove it later on if we do not need it...
        setTimeout(() => {
          /* this.data.getUserDetails().subscribe(data => {
            if (data['profileType'].length > 0)
              return this.router.navigate(['/profile']);
            else
              return this.router.navigate(['/create-profile']);
          }); */
          return this.router.navigate(['/create-profile']);
        }, 3000);
      }
      //email-id not registered or password mismatch
      else if (this.data$['status'] == 404) {
        console.log("this.data$:", this.data$);
        this.error$['isVisible'] = true;
        this.error$['message'] = this.data$['message'];
        this.errorToast();
      }
      else {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = "Server problem. Please try again after some time";
        this.errorToast();
      }
    }, (error) => {
      // any other error from server
      console.log("error.status:", error.status);
      this.error$['isVisible'] = true;
      this.error$['message'] = "Server problem. Please try again after some time";
      this.errorToast();
    });
  }

  resetPassword() {
    var email$: Object = {
      "email": this.user$['reset_emailid']
    };
    this.data.postForgotPwd_Email(email$).subscribe(data => {
      this.data$ = data;
      if (this.data$['status'] == 200) {
        console.log("this.data$:", this.data$);
        this.success$['title'] = "SUCCESS";
        this.success$['message'] = this.data$['message'];
        this.successToast();
        setTimeout(() => {
          return this.showRecoverNLoginForm();
        }, 3000);
      }
      else {
        console.log("this.data$:", this.data$);
        this.error$['isVisible'] = true;
        this.error$['title'] = "ERROR";
        this.error$['message'] = this.data$['status'];
        this.errorToast();
      }
    }, (error) => {
      console.log("error:", error);
      console.log("error.status:", error.status);
      this.error$['isVisible'] = true;
      this.error$['title'] = "ERROR";
      this.error$['message'] = error['statusText'];
      this.errorToast();
    });
  }
}