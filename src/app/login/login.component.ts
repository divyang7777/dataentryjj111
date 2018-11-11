import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiServiceService } from '../Services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;

  constructor(public api: ApiServiceService, public route: Router) { 
    this.api.isAdmin = false;
  }

  ngOnInit() {
  }

  checkPassword() {
    if (this.password == 'Admin@GNC') {
      this.api.isAdmin = true;
      this.route.navigateByUrl('/admin-panal');
    }
  }

}
