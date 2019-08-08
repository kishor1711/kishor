import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:8080/loginController/login";
    login(username: string, password: string) {
        return this.http.post<any>(this.baseUrl, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
      // return this.http.get(this.baseUrl);
    }

    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
