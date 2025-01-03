import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../../../core';
import { catchError, map, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private readonly authService: AuthService = inject(AuthService);

  public loginCredentials: any = {
    username: "",
    password: ""
  }

  public submitted(): void {
    this.authService.login(this.loginCredentials).subscribe();
  }
}
