import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AutorizeService } from 'src/app/services/Autorize.service';
import { JWTTokenService } from './JWTToken.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService implements CanActivate {
  constructor(private loginService: AutorizeService,
              private authStorageService: LocalStorageService,
              private jwtService: JWTTokenService,
              private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    var token = this.authStorageService.get("token");
    this.jwtService.setToken(token);
      if (this.jwtService.getUser())
      {
          if (this.jwtService.isTokenExpired())
          {
            // this.loginService.RefreshSession();
            this.router.navigateByUrl('/login');
            return true;
          } else
          {
            return true;
          }
      } else
      {
        return new Promise((resolve) =>
        {
          // this.loginService.signIncallBack().then(() =>
          // {
          //    resolve(true);
          // }).catch(() =>
          // {
            this.router.navigateByUrl('/login');
          // });
        });
      }
  }
}
