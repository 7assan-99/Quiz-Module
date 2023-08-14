import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = localStorage.getItem('token');
    if (token) {
      let payload = this.jwtHelper.decodeToken(token);

      let isExpired = this.jwtHelper.isTokenExpired(token);
      //token is expired
      if (isExpired) return this.router.navigate(['login']);

      return payload.role === 'student' ? true : this.router.navigate(['login']);
    }
    return this.router.navigate(['login']);
  }
}
