import { Component, inject } from '@angular/core';
import { AuthService } from '../../core';
import { catchError, map, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private authService: AuthService = inject(AuthService);

  public getDemo(): void {
    this.authService.getDemo().subscribe();
  }

  public refreshToken(): void {
    this.authService.refreshToken().subscribe();
  }
}
