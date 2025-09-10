import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpData} from '../interfaces/signupdata-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users'
  private http = inject(HttpClient);

  signUp(data: SignUpData): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }
}
