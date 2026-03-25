import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `<p>Redirection vers la connexion...</p>`,
})
export class LoginComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      } else {
        this.oidcSecurityService.authorize();
      }
    });
  }
}