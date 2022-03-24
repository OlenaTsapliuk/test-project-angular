import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserType, UserTypeOption } from 'src/app/models/user.interface';
import { Store } from '@ngrx/store';
import *as AuthActions from '../../store/auth/auth.action'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public userTypes!: UserTypeOption<UserType>[];
  public emailMatched: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.userTypes = [
      { label: 'Админ', value: UserType.Admin },
      { label: 'Покупатель', value: UserType.Customer }
    ];
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      email: ['', [
        Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, this.passwordMatched]],
   
    });

  }
  
  public get password() {
    return this.registerForm.get('password')
  };
  public get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')
  }

  // isControlInvalid(controlName: string): boolean {
  //   const control = this.registerForm.controls[controlName];
  //   return control.invalid && control.touched;
    
  // }

  //   passwordValidator(control: FormControl): ValidationErrors {
  //     const value = control.value;
  //     const hasNumber = /[0-9]/.test(value);
  //     // const hasCapitalLetter = /[A-Z]/.test(value);
  //     // const hasLowercaseLetter = /[a-z]/.test(value);
  //     const isLengthValid = value ? value.length > 6 : false;
 
  //     const passwordValid=hasNumber && isLengthValid &&undefined && null;
  
  //  if (!passwordValid) {
  //   return { invalidPassword: 'Пароль не прошел валидацию' };
  //  }
  //   return this.registerForm.value.setErrors(null);
  // }
  
  passwordMatched = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: AbstractControl | undefined | null = control?.parent?.get('password');
      const isSame = password?.value === control?.value;
      return isSame ? null : { notEqualPassword: { value: true } }
    }
  }

  onSubmit() {
    const { email, password, name, type } = this.registerForm.value;
    const credentials = { email, password, name, type };

    if (this.registerForm.valid) {
      this.store.dispatch(AuthActions.registerRequest({ credentials }));
    }
    this.emailMatched = true;

    // const user: Partial<User> = { email, password, name, type };
    // if (email && password && name) {
    //   this.authService.register(user).pipe(take(1)).subscribe((user) => {
    //     if (user)
    //       this.authService.setToLocalStorage(user);
    //      this.router.navigateByUrl(''); 
    //   }, err => {
    //     this.emailMatched = true;
    //   })
    // };
  }



}