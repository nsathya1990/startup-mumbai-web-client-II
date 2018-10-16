import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: Object = {};

  constructor(private userData: SignUpService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  addUser() {
    this.userData.postNewUser({
      email : this.user['email'],
      password: this.user['password'],
      name: this.user['name']
    }).subscribe((data) => {
      console.log(data);
      if (data['message'] === 'User registered successfully') {
        console.log('User registered successfully');
        this.user = data;
        this.toastrService.success('User registered successfully', 'Successfully');
        this.router.navigate(['/home']);
      } else if (data['message'] === 'Account with that email address already exists.') {
        this.toastrService.error('Account with that email address already exists.', 'User registration failed');
      } else {
        console.log('User registration failed');
        this.toastrService.error('User registration failed', 'Failed');
      }
    });
  }

}

