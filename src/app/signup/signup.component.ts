import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: Object = {};

  constructor(private userData: SignUpService) { }

  ngOnInit() {
  }

  addUser() {
    this.userData.postNewUser(this.user).subscribe((data) => this.user = data);
  }

}
