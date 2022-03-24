import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable, switchMap, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { User, UserType, UserTypeOption } from '../models/user.interface';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User[] = [];
  public isLoggedIn$ = new BehaviorSubject(false);
  public userTypes!: UserTypeOption<UserType>[];
 
   
  constructor(private http: HttpClient, private router: Router) { }

  public login(email: string, password: string): Observable<User | undefined> {
    if (!email&&!password) { 
      return throwError(() =>new Error());
    } else { 
       return this.http.get<User[]>(`${environment.API_URL}users?email=${email}&password=${password}`)
      .pipe(first(), map((users) => users.length ? users[0] : undefined))
    }
   
  }

  public register({ email, name, password, type }: Partial<User>): Observable <User> {
    const newUser: Partial<User> = {
      id: uuid(),
      type,
      name,
      email,
      password,
      token: "erSDeXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2NDMyMDEwMTUsImV4cCI6MTY3NDczNzAxNiwiYXVkIjoiIiwic3ViIjoiIiwibG9naW4iOiJsb2dpbkBsb2dpbi5sb2dpbiIsInBhc3N3b3JkIjoicGFzc3dvcmQifQ.HqfPuHXXA46af97JU0bARG63mHpFK2Q__1ABvLLMkwU"
    };
    
    return this.checkUserEmail(email!).pipe(switchMap((email) => {
      if (!email) {
        return this.http.post<User>(`${environment.API_URL}users`, newUser);
      }
      else {
        return throwError(() =>new Error());
      }
    })
    )
  }

  public checkUserEmail(email: string): Observable<boolean> {
     return this.http.get<User[]>(`${environment.API_URL}users?email=${email}`).pipe(first(),
       map((user) =>
        !!(user && user[0])
       ));
  }

  public updateUser(user: User): Observable<User> {
    if (!user) {
      return throwError(() =>new Error());
    }
       return this.http.put<User>(`${environment.API_URL}users/${user.id}`, user);
        console.log(user);

      }

  public getUsers():Observable<User[]> { 
    return this.http.get<User[]>(environment.API_URL + 'users');
  }
  
  public deleteUser(id:string): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.API_URL}users/${id}`)
  }

  public setToken( token:any) {
    localStorage.setItem('token', token);
    this.isLoggedIn$.next(true); 
  }

  public setUserType(type: string) {
    localStorage.setItem('type',type)
  }
 
  public setToLocalStorage(user:User) {
    if(user) localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn$.next(true);
  }
  
  public getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public getToken() {
    localStorage.getItem('token') 
  }

  public isLoggedIn() {
    return this.getToken() !==null;
  }

  public isLoggedOut() {
    localStorage.clear();
    this.isLoggedIn$.next(false);
    this.router.navigateByUrl('/login'); 
  }

  public isAdmin() {
   return localStorage.getItem('type') === 'admin';
  }


}



