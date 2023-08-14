import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-instructor-nav',
  templateUrl: './instructor-nav.component.html',
  styleUrls: ['./instructor-nav.component.scss'],
})
export class InstructorNavComponent {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let payload = this.jwtHelper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
