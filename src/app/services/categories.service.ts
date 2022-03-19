import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getCategories() { 
    return this.http.get<Category[]>(environment.API_URL + 'categories');
  }

   public addCategory(category:Category):Observable<Category> { 
       
    return this.http.post<Category>(environment.API_URL + 'categories',category);
  } 
  
  public editCategory(id: string, category: Category): Observable<Category> { 
       
    return this.http.put<Category>(`${environment.API_URL}categories/${id}`, category);
  } 

}