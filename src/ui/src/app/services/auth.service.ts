import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/account'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  googleLogin(idToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google-login`, { idToken });
  }
}