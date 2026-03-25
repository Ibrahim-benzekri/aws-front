import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [autoLoginPartialRoutesGuard] },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [autoLoginPartialRoutesGuard],
  },
];