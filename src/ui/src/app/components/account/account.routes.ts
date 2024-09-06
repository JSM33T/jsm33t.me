import { Routes } from '@angular/router';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'otp',
    loadComponent: () => import('./otp/otp.component').then(m => m.OtpComponent)
  },
  {
    path: 'recovery',
    loadComponent: () => import('./recovery/recovery.component').then(m => m.RecoveryComponent)
  },
];