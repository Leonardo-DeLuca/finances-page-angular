import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { UsersService } from '../../services/users-service';
import { SignUpData } from '../../interfaces/signupdata-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  signUpForm: FormGroup;
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  loginSucess: boolean;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.loginSucess = false;
    
    this.signUpForm = this.fb.group({
      firstName: ['', { nonNullable: true, validators: Validators.required}],
      lastName: ['', { nonNullable: true, validators: Validators.required}],
      email: ['', { nonNullable: true, validators: [Validators.required, Validators.email]}],
      passwordForm: this.fb.group({
        password: ['', { nonNullable: true, validators: Validators.required}],
        confirmPassword: ['', { nonNullable: true, validators: Validators.required}]
      }, { validators: confirmPasswordValidator })
    });
  }

  get passwordForm(): FormGroup {
    return this.signUpForm.get('passwordForm') as FormGroup;
  }
  get password(): FormControl{
    return this.passwordForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl{
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  get emailError(): string {
    const emailCtrl = this.signUpForm.get('email');
    if (!emailCtrl) return '';
    if (emailCtrl.hasError('required')) return 'You must enter a value';
    if (emailCtrl.hasError('email')) return 'Not a valid email';
    if (emailCtrl.hasError('emailTaken')) return 'Email already exists';
    return '';
  }

  get blankError(): string {
    return 'You must enter a value';
  }

  get passwordError(): string {
    const pwd = this.password;
    return pwd && pwd.invalid && pwd.touched ? this.blankError : '';
  }

  get passwordMatchError(): string {
    const confirm = this.confirmPassword;
    const group = this.passwordForm;
    if (!confirm) return '';
    if (confirm.touched) {
      if (confirm.hasError('required')) return this.blankError;
      if (confirm.hasError('passwordMismatch')) return 'Passwords do not match';
      if (group.hasError && group.hasError('passwordMismatch')) return 'Passwords do not match';
    }
    return '';
  }

  submit(): void {
    if (this.signUpForm.valid) {
      const { passwordForm, ...rest } = this.signUpForm.value;
      const data: SignUpData = {
        email: rest.email,
        firstName: rest.firstName,
        lastName: rest.lastName,
        password: passwordForm.password
      };

      this.usersService.signUp(data).subscribe({
        next: (res) => {
          this.signUpForm.reset();
          this.loginSucess = true;
        },
        error: (err) => {
          if(err.error.statusCode === 409){
            this.signUpForm.get('email')?.setErrors({ emailTaken: true })
          }

          console.error('Erro ao criar usuário', err);
          this._snackBar.open(`Registration error. ${err.error?.message}`, 'Ok',{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}