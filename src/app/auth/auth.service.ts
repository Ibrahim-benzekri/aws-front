import { Injectable } from '@angular/core';
import { signInWithRedirect, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login() {
    try {
      await signInWithRedirect();
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  }

  async logout() {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  }

  async getCurrentUser() {
    try {
      return await getCurrentUser();
    } catch (error) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const session = await fetchAuthSession();
      return !!session.tokens?.accessToken;
    } catch (error) {
      return false;
    }
  }
}
