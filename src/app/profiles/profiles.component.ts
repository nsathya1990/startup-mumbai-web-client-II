import { Observable, Subscription } from 'rxjs/Rx'; //third party plugin
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profile$: Object = {};

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    //this.data.getProfile().subscribe(data => this.profile$ = data);
    //checking if the user is logged-in
    var access_token = localStorage.getItem('startup-mumbai');
    if (!access_token) {
      this.router.navigate(['/login']);
    }
    else
      this.router.navigate(['/profile']);
  }

}
