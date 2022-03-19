import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  isLoginStatus$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService, private router: Router) { 
     this.isLoginStatus$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
  }
  logoutUser() {
    this.authService.isLoggedOut();
    
}
}
