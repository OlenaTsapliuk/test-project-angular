import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import *as AuthActions from '../../store/auth/auth.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailMatched: boolean = false;
  loginForm!: FormGroup;
  
  
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    
  }

  // isControlInvalid(controlName: string): boolean {
  //   const control = this.loginForm.controls[controlName];
  //   const result = control.invalid && control.touched;
  //   return result;
  // }

  onSubmit() {
    const val: User = this.loginForm.value;
    const credentials = {
      email: val.email,
      password: val.password,
    }

    if (this.loginForm.valid) {

      this.store.dispatch(AuthActions.loginRequest({ credentials }))
     
    }
    else {
        this.emailMatched = true;
      }
   
    }
  }
