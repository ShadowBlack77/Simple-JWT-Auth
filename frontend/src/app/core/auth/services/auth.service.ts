import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public login(loginCredentials: any): Observable<unknown> {
    return this.httpClient.post<unknown>('http://localhost:8080/login', loginCredentials, { withCredentials: true }).pipe(
      take(1),
      map((res: any) => {
        const accessToken = res.access_token;

        localStorage.setItem('java-at', accessToken);
      })
    );
  }

  public register(registerCredentials: any): Observable<unknown> {
    return this.httpClient.post<unknown>('http://localhost:8080/register', registerCredentials);
  }

  public checkTokenValidity(guardHeader: string = 'false'): Observable<unknown> {
    const accessToken = localStorage.getItem('java-at');

    if (accessToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'X-Bypass-Interceptor': guardHeader
      });

      return this.httpClient.get('http://localhost:8080/token-validity', { headers }).pipe(
        take(1),
        map((res) => {
          return res;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(errorResponse);
        })
      )
    }

    return of(false);
  }

  public refreshToken(guardHeader: string = 'false'): Observable<unknown> {

    const headers = new HttpHeaders({
      'X-Bypass-Interceptor': guardHeader
    });

    return this.httpClient.post<unknown>('http://localhost:8080/refresh_token', { content: 'refresh_token' }, { withCredentials: true, headers }).pipe(
      take(1),
      map((res: any) => {
        const accessToken = res.access_token;

        localStorage.setItem('java-at', accessToken);

        return of(true);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(errorResponse);
      })
    );
  }

  public logout(): Observable<unknown> {
    return this.httpClient.get<unknown>('http://localhost:8080/logout');
  }

  public getDemo(): Observable<unknown> {
    return this.httpClient.get<unknown>('http://localhost:8080/demo').pipe(
      take(1),
      map((res) => {
        console.log(res);
      })
    );
  }
}
