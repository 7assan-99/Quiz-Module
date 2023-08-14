import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  
  constructor(private jwtHelper: JwtHelperService){}
  
  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
  }


}
