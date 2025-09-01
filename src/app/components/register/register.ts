import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  readonly firstName = new FormControl('', { nonNullable: true, validators: Validators.required });
  readonly lastName = new FormControl('', { nonNullable: true, validators: Validators.required });
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });

  readonly passwordForm = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: Validators.required })
  }, { validators: confirmPasswordValidator });

  get emailError(): string {
    const error = this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
    return error;
  }

  get blankError(): string {
    return 'You must enter a value';
  }

  get passwordError(): string {
    const control = this.passwordForm.get('password');
    return control && control.invalid && control.touched ? this.blankError : '';
  }

  get passwordMatchError(): string {
    const control = this.passwordForm.get('confirmPassword');
    if (control && control.touched) {
      if (control.hasError('required')) {
        return this.blankError;
      }
      if (control.hasError('passwordMismatch')) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
}