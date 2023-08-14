import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit{
  isMasterAdmin: boolean=false;

  constructor(private jwtHelper: JwtHelperService, private router: Router){}
  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let payload = this.jwtHelper.decodeToken(token);
    this.isMasterAdmin = payload.masteradmin
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}
