import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CallbackComponent } from './auth/callback.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: CallbackComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
];