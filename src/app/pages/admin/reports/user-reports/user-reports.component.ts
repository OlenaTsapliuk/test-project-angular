import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.scss']
})
export class UserReportsComponent implements OnInit {
  public users: User[] = [];
  public userList$  = new Observable<User[]>();
  
  constructor(private authService: AuthService) { 
    this.userList$ = this.authService.getUsers();
  }

  ngOnInit(): void {
    
  }

  public deleteUserFromDb(user:User) {
    this.users = this.users.filter(data => data !== user);
    this.authService.deleteUser(user.id).subscribe((data) => {
    console.log(data);
    });
    this.userList$ = this.authService.getUsers();
    }
}
