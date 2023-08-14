import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit{
  constructor(private jwtHelper: JwtHelperService){}

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
  }


}
