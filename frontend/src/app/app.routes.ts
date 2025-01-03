import { Routes } from '@angular/router';
import { ContentComponent, DashboardComponent, HomeComponent, LoginComponent, RegisterComponent } from './pages';

export const routes: Routes = [
  { path: '', component: ContentComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent }
  ]},
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]}
]; 
