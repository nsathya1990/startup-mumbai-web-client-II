import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePasswordService } from '../change-password.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  user: Object = {};

  token: String;

  constructor(private changePwd: ChangePasswordService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  changePassword() {
    this.changePwd.postChangePassword({
      currentPassword : this.user['currentPassword'],
      newPassword: this.user['newPassword'],
    }).subscribe((data) => {
      console.log(data);
      if (data['message'] === 'password change successfully') {
        console.log('password changed successfully');
        this.user = data;
        this.toastrService.success('password changed successfully', 'Successfully');
        this.router.navigate(['/home']);
      } else if (data['message'] === 'Access token expired') {
        this.toastrService.error('Access token expired.', 'Change password failed');
       } else if (data['message'] === 'Access token required') {
        this.toastrService.error('Access token required.', 'Change password failed');
       } else if (data['message'] === 'Error parsing token') {
        this.toastrService.error('Error parsing token.', 'Change password failed');
       } else {
        console.log('password incorrect');
        this.toastrService.error('Password change failed', 'Failed');
      }
    });
  }
  }

