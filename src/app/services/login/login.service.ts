import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

export interface AccessTokenResponse {
  accessToken: string,
  expiresAt: Date,
  role: string
  refreshTokenExpiresAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;
  private accessToken: AccessTokenResponse | null = null;
  constructor(private httpClient: HttpClient) { };

  public getOrRefreshAccessToken(): Observable<AccessTokenResponse> {
    if (!this.accessToken || this.accessToken.expiresAt.getTime() + 10 <= Date.now()) {
      console.log("no access token, or expired, refreshing...")
      return this.doLogin()
    }

    return of(this.accessToken)
  }

  get getAccessToken() {
    if (!this.accessToken) {
      return null;
    }

    if (this.accessToken.expiresAt.getTime() + 10 <= Date.now()) {
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
        catchError((err) => this.handleAccessTokenError(err, this)),
        map(res => {
          console.log('successful response from the bff access token endpoint')
          this.accessToken = res;
          this.accessToken.expiresAt = new Date(this.accessToken.expiresAt);
          this.accessToken.refreshTokenExpiresAt = new Date(this.accessToken.refreshTokenExpiresAt);
          this.loggedIn = true;

          return res;
        })
      )
  }

  private handleAccessTokenError(error: HttpErrorResponse, that: LoginService) {
    console.log(`bff access token returned a non success response: ${error.status}`)
    that.accessToken = null;
    that.loggedIn = false;
    if (error.status === 400) {
      console.log('error is 400, redirect to auth url')
      window.location.href = "http://localhost:8080/auth/authorization_url"
    }

    return throwError(() => `error: ${error.status}`)
  }
}
