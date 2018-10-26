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
    document.getElementById("frgtpwdform").hidden = true;
    this.route.params.subscribe(params => {
      this.token = params.token;
      return;
    });
    this.token$ = {
      "token": this.token
    }
    console.log("this.token$:", this.token$);
    this.data.postResetPwdAuthToken(this.token$).subscribe(data => {
      this.data$ = data;
      //If token valid
      if (this.data$['isValid'] == true) {
        document.getElementById("frgtpwdform").hidden = false;
        return;
      } else {
        this.toastrService.error(this.data$['message'], "ERROR"); //form remain hidden & error message displayed
      }
    }, (error) => {
      // any other error from server
      console.log("error.status:", error.status);
      this.toastrService.error(error['message'], "ERROR");
    });

    //checking if the user is logged-in
    var access_token = localStorage.getItem('startup-mumbai');
    if (access_token) {
      this.router.navigate(['/home']);
    }
  }

  submitNewPwd() {
    this.data$ = {
      "password": this.user$['password'],
      "token": this.token
    }
    this.data.postResetPwdUpdatePwd(this.data$).subscribe(data => {
      console.log("data:", data);
      this.router.navigate(['/login']);
    });
  }
}
