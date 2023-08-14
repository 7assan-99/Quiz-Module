import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../api';
import { Category } from '../entities/category.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  api = API_URL;

  public createCategory(c: Category){
    return this.http.post(`${this.api}/category/create`,c)
  }

  public getCategoriesByExam(eId: string){
    return this.http.get(
      `${this.api}/category/get-categories-by-exam/${eId}`
    );
  }

  public updateCategory(c: Category){
    return this.http.put(`${this.api}/category/update-category`,c)
  }

  public deleteCategory(id: number){
    return this.http.delete(`${this.api}/category/delete/${id}`)
  }
}
