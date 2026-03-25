import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `<p>Connexion en cours...</p>`,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  ngOnInit() {
    this.authService.login();
  }
}