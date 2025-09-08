import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response-interface';
import { LoggedUser } from '../interfaces/loggeduser-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth';

  user = signal<LoggedUser | null>(null);

  login(email: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        this.fetchUser(res.access_token);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  fetchUser(token: string){
    this.http.get<LoggedUser>('http://localhost:3000/users/me',{
      headers: {Authorization: `Bearer ${token}`}
    }).pipe(
      catchError(() => of(null))
    ).subscribe(user => this.user.set(user));
  }
}
