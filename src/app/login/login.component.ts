import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import md5 from 'md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: any;

  constructor(
    private authService: LoginService,
    private snackBar: MatSnackBar, 
    private jwtHelper: JwtHelperService,
    private router: Router
    ){}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      id: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  authenticateUser(data: any){
    let token;
    this.authService.authenticateUser({ID: data.id,Password: md5(data.password)}).subscribe((val:any)=>{
      token = val.access_token;
      localStorage.setItem('token',token)
      this.decideUserRedirect(token)
    },({error})=>{
      this.snackBar.open(error.message, 'Dismiss', {
        duration: 3000,
        panelClass: 'danger-snack-bar',
      });
    })
  }

  decideUserRedirect(token: any){
    let payload = this.jwtHelper.decodeToken(token)
    switch(payload.role){
      case 'admin': 
          this.router.navigate(['ad/mCourses']);
          break;
      case 'student':
          this.router.navigate(['sd/courses']);
          break;
      case 'instructor':
          this.router.navigate(['id/courses']);
          break;
      default: break;
    }
  }
}
