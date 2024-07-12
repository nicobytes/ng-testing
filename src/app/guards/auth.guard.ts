import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const token = this.tokenService.getToken();
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;
    // route.paramMap.get('idProduct');
    // route.paramMap.has('idProduct');
    return this.authService.getUser().pipe(
      map((user) => {
        if (!user) {
          return this.router.createUrlTree(['/']);
        }
        return true;
      }),
    );
  }
}
