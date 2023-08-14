import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  api_url = API_URL

  public authenticateUser(u: any){
    return this.http.post(`${this.api_url}/auth/login`, u);
  }
}
