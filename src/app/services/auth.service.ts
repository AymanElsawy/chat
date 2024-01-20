import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient); // inject the http client
  private cookieService = inject(CookieService); // inject the cookie service
  currentToken = this.cookieService.get('token') || ''; // get token from cookie
  token = new BehaviorSubject(this.currentToken) ; // create a new behavior subject


  login(username: string, password: string) {
    return this.http.post<{ message: string, token: string }>(`${environment.api}/login`, { username, password }).pipe( // pipe
      map(res => { // map the response
        this.token.next(res.token); // set token to token
        this.cookieService.set('token', res.token); // set token to cookie
        return true
      })
    )
  }

  getPayLoad() {
    const token = this.token.getValue(); // get token
    if (!token) return; // if token is empty
    const payload = JSON.parse(atob(token.split('.')[1])); // get payload from token
    return this.getUserData(payload.id); // get user data
  }

  getUserData(id: string):Observable<User> {
    return this.http.get<User>(`${environment.api}/user/${id}`); // get user data
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.api}/users`);
  }

  signup(username:string,password:string,repeat_password:string) {
    return this.http.post<{ message: string, token: string }>(`${environment.api}/signup`, { username, password, repeat_password }).pipe(
      map(res => { // map the response
        this.token.next(res.token); // set token to token
        this.cookieService.set('token', res.token); // set token to cookie
        return true
      })
    )
  }

  logout() {
    this.token.next(''); // set token to empty
    this.cookieService.delete('token'); // delete token from cookie
  }
}
