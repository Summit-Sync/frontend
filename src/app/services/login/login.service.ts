import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

interface AccessTokenResponse {
  accessToken: string,
  expiresIn: number,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;
  private accessToken: AccessTokenResponse | null = null;
  constructor(private httpClient: HttpClient) { };

  get getAccessToken() {
    if (!this.accessToken) {
      return null;
    }

    if (this.accessToken.expiresIn <= 10) {
      this.accessToken = null;
      this.loggedIn = false;

      return null;
    }

    return this.accessToken;
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  set isLoggedIn(status: boolean) {
    this.loggedIn = status;
  }

  public doLogin() {
    return this.httpClient.get<AccessTokenResponse>("http://localhost:8080/auth/access_token", {withCredentials: true})
      .pipe(
        catchError(this.handleAccessTokenError),
        map(res => {
          this.accessToken = res;
          this.loggedIn = true;

          return res;
        })
      )
  }

  private handleAccessTokenError(error: HttpErrorResponse) {
    if (error.status === 400) {
      window.location.href = "http://localhost:8080/auth/authorization_url"
    }

    return throwError(() => `error: ${error.status}`)
  }
}
