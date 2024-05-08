import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// import { UserService } from '../user.service';
import { from, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string =
    'eyJhbGciOiJFUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRHlvU2NsRWI4UE9ydkp4UlFYYzRoTVNmT3YzUUFYbGRYSG1wVEJxNXlzIn0.eyJleHAiOjE3MTUxODcxMzMsImlhdCI6MTcxNTE1MTEzMywianRpIjoiMTdlZGExM2YtMTYwYy00N2Y1LTk0NTYtZmY1NDdlZGUxOTM1IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zdW1taXRzeW5jLm1lc2NodGVyLm1lL3JlYWxtcy9zdW1taXQtc3luYyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50Iiwic3VtbWl0c3luYyIsImFjY291bnQiXSwic3ViIjoiNzI1NGRkNWUtZGM4MC00M2FlLWE3YjEtZTFiNTg5MGUwNDg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3VtbWl0LXN5bmMtYmZmIiwic2Vzc2lvbl9zdGF0ZSI6IjQ1M2I4NjJhLTZhM2ItNGViOC1hYzQ5LTNhN2Q2ZmE0MzcyYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovLzEyNy4wLjAuMToqIiwiaHR0cHM6Ly9hcGkuc3MiLCJodHRwOi8vbG9jYWxob3N0OioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc3VtbWl0LXN5bmMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwibWFuYWdlLXVzZXJzIiwidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJzdW1taXRzeW5jIjp7InJvbGVzIjpbImFkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNDUzYjg2MmEtNmEzYi00ZWI4LWFjNDktM2E3ZDZmYTQzNzJiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdCBBZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RfYWRtaW4iLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiQWRtaW4ifQ.2Mz8Pu-lU3q0uWp6td79GhUpYAm4wTS5Nx4_DgJSiasXeij_I5aN4waNWxvAegnP2H4dSXifKn1MRG831qIm2A';

  //   const userService = inject(UserService);

  console.log('injecting token');
  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
  );
};
