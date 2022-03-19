import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { User, UserType, UserTypeOption } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  userTypes!: UserTypeOption<UserType>[];
  user: User[] = [];

  notifier = new Subject();

  public emailRepeat: boolean = false;
  public emailMatched: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
      type: [null, [Validators.required]],
      name: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      email: ['', [
        Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      passwordConfirm: ['', [Validators.required]],
   
    });

  }
  //   passwordMatchValidator(password:string, passwordConfirm:string) {
  //    return this.registerForm.get('password')?.value === this.registerForm.get('passwordConfirm')?.value
  //       ? null : {'mismatch': true};
  // }
  
  public get password() {
    return this.registerForm.get('password')
  };
  public get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

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
  
  passwordValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: AbstractControl | undefined | null = control?.parent?.get('password');
      const isSame = password?.value === control?.value;
      return isSame ? null : { notEqualPassword: { value: true } }
    }
  }

  onSubmit() {
    const { email, password, name, type } = this.registerForm.value;
    const user: Partial<User> = { email, password, name, type };
    if (email && password && name) {
      this.authService.register(user).subscribe((user) => {
        if (user)
          // this.authService.setToken(user.token);
          this.authService.setToLocalStorage(user);
        console.log(user)
         this.router.navigateByUrl(''); 
      }, err => {
        this.emailMatched = true;
      })
    }
  

  }
}