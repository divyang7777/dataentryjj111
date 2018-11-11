import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServiceService } from './Services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public api: ApiServiceService) { }
  
  canActivate() {
    if (this.api.isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
