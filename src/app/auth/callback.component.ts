import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div class="callback-container">
      <h2>Authentification en cours...</h2>
      <div class="loading-spinner"></div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: white;
    }
    .loading-spinner {
      margin-top: 20px;
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      // Amplify gère automatiquement l'échange du code via Hosted UI (OAuth)
      const session = await fetchAuthSession();
      
      if (session.tokens) {
        console.log('Authentification réussie');
        const user = await getCurrentUser();
        // Rediriger vers la page principale
        this.router.navigate(['/main']);
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      // Rediriger vers une route login si nécessaire, ou on redirige vers / (qui déclenchera le guard)
      this.router.navigate(['/']);
    }
  }
}
