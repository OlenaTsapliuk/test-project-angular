import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import *as AuthActions from '../../store/auth/auth.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailMatched: boolean = false;
  public loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    const credentials = {
      email,
      password,
    };

    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.loginRequest({ credentials }));
    }
  }
  
}
