import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterLink
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly password = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  hide = signal(true);
  loading= signal(false);
  errorMsg = signal('');

  get emailError(): string {
    if (this.email.hasError('required')) return 'You must enter a value';
    if (this.email.hasError('email')) return 'Not a valid email';
    return '';
  };

  get passwordError(): string{
    return 'You must enter a value';
  };

  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  onSubmit(): void{
    if (this.email.invalid || this.password.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    this.loading.set(true);
      this.authService.login(this.email.value, this.password.value).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/app'])
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMsg.set(err.error?.message || 'Login failed');
        }
      });
  }
}
