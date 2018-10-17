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
  }

  showRecoverNLoginForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  errorToast() {
    let title = "Login Error";
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
          toast.title = "Login Error"; // Update title of toast
          toast.msg = "Please enter your correct login credentials"; // Update message of toast
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
      //email-id not registered or password mismatch
      if (this.data$['status'] == 404) {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = this.data$['message'];
        this.errorToast();
      }
      // success scenario ... receive access token
      else if (this.data$['status'] == 200) {
        console.log("data$:", this.data$);
        localStorage.setItem('startup-mumbai', this.data$['token']);
        this.data.getUserDetails().subscribe(data => {

          this.success$['title'] = "Startup Mumbai";
          this.success$['message'] = "Successfully logged-in";
          this.successToast();
          //log-in after 3 seconds, so that we can make the toastr visible. Remove it later on if we do not need it...
          setTimeout(() => {
            return this.router.navigate(['/']);
          }, 3000);

        }, (error) => {
          // any other error from server
          console.log("error.status:", error.status);
          this.error$['isVisible'] = true;
          this.error$['message'] = "Server problem. Please try again after some time";
          this.errorToast();
        });
      }
      // HTTP Error scenarios ... status: 401
      else {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = "Server problem. Please try again after some time";
        this.errorToast();
      }
    });
  }

  resetPassword() {
    console.log("Inside resetPassword():", this.user$['reset_emailid']);
    this.data.postResetPwd(this.user$['reset_emailid']).subscribe(data => {

      if (this.data$['status'] == 404) {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = "Error. Please try again after some time";
        this.errorToast();
      }
      // success scenario ... recieve access token.
      else if (this.data$['status'] == 401) { //change it to 200 later
        this.success$['title'] = "Reset Password";
        this.success$['message'] = "Please click on the link sent to your id to rest your password";
        this.successToast();
      }
      else {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = "Error encountered. Please try again after some time";
        this.errorToast();
      }
    }, (error) => {
      console.log("error.status:", error.status);
      /* this.error$['isVisible'] = true;
      this.error$['message'] = "Error encountered. Please try again after some time";
      this.errorToast(); */
      this.success$['title'] = "Reset Password";
      this.success$['message'] = "Please click on the link sent to your email-id to rest your password";
      this.successToast();
      this.showRecoverNLoginForm();
    });
  }
}