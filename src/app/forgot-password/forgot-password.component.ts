import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user$: Object = {};
  data$: Object = {};
  token: String;
  token$: Object = {};

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    document.getElementById("forgot-pwd-form").hidden = true; //hide the form on form load
    this.route.params.subscribe(params => {
      this.token = params.token;
      return;
    });
    this.token$ = {
      "token": this.token
    }
    console.log("this.token$:", this.token$);
    // if token is present in url param
    if (this.token) {
      this.data.validateToken(this.token$).subscribe(data => {
        this.data$ = data;
        //If token valid
        if (this.data$['isValid'] == true) {
          document.getElementById("forgot-pwd-form").hidden = false;
          return;
        } else {
          this.toastrService.error(this.data$['message'], "ERROR"); //form remain hidden & error message displayed
          this.router.navigate(['/login']);
        }
      }, (error) => {
        // any other error from server
        console.log("error.status:", error.status);
        this.toastrService.error(error['message'], "ERROR");
      });
    } 
    else {
      //checking if the user is logged-in ... using access_token
      var access_token = localStorage.getItem('startup-mumbai');
      if (!access_token) {
        document.getElementById("forgot-pwd-form").hidden = false;
        this.router.navigate(['/reset-password']);
      }
      else {
        this.navigateNextPage();
      }
    }
  }

  submitNewPwd() {
    this.data$ = {
      "password": this.user$['password'],
      "token": this.token
    }
    this.data.resetPwdUpdatePwd(this.data$).subscribe(data => {
      console.log("data:", data);
      this.router.navigate(['/login']);
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
