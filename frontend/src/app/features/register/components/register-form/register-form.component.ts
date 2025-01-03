import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core';
import { catchError, map, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  private readonly authService: AuthService = inject(AuthService);

  public registerCredentials: any = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "USER"
  }

  public submitted(): void {
    this.authService.register(this.registerCredentials).pipe(
      take(1),
      map((res) => {
        console.log(res);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);

        return throwError(() => errorResponse);
      })
    ).subscribe();
  }
}
