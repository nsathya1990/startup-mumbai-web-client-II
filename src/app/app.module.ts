import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule  } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastaModule } from 'ngx-toasta';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HomeComponent } from './home/home.component';
import { ProfilesComponent } from './profiles/profiles.component';

import { SignUpService } from './sign-up.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        ChangepasswordComponent,
        ProfilesComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        ToastaModule.forRoot(), // ToastaModule added
        NgbModule.forRoot()
    ],
    providers: [SignUpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
