import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
// import { UserService } from '../user.service';
import { EMPTY, from, map, switchMap } from 'rxjs';
import { LoginService } from './login/login.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const url = new URL(req.url);
  console.log(url);
  if (url.pathname.startsWith("/auth")) {
    return next(req);
  }

  const loginService = inject(LoginService);
  return loginService.getOrRefreshAccessToken().pipe(
    switchMap(token => {
      return next(addHeader(req, token.accessToken))
    })
  )
};

const addHeader = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  })
}
