import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../api';
import { Admin } from '../entities/admin.entity';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  api = API_URL;

  public getAdmins(){
    return this.http.get<Admin[]>(`${this.api}/admin`)
  }

  public createAdmin(u: User,isMasterAdmin: boolean){
    return this.http.post(`${this.api}/user/create-admin/${isMasterAdmin}`,u);
  }

  public deleteAdmin(id: number){
    return this.http.delete(`${this.api}/admin/delete/${id}`);
  }

  public updateAdmin(id: number, u: any){
    return this.http.put(`${this.api}/admin/update/${id}`,u)
  }
}
