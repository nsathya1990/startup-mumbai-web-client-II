import { Observable, Subscription } from 'rxjs/Rx'; //third party plugin
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

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
  error$: Object = {
    isVisible: Boolean,
    message: String
  };

  constructor(private data: DataService, private toastaService: ToastaService, private toastaConfig: ToastaConfig) {
    this.toastaConfig.theme = 'default';
  }

  ngOnInit() {
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  errorToast() {
    let title = "Login Error";
    let message = "Invalid email address/password combination.";
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
        subscription.unsubscribe();// Stop listenning
      }
    };
    this.toastaService.error(toastOptions);
  }

  onLogin() {
    console.log("this.user$:", this.user$);
    this.data.postLogin(this.user$).subscribe(data => {

      console.log("data:", data);
      this.data$ = data;
      if (this.data$['status'] == 401) {
        console.log("status:", this.data$['status']);
        this.error$['isVisible'] = true;
        this.error$['message'] = "Invalid email address/password combination";
        this.errorToast();
      }
    });
  }
}