import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';

const origin = window.location.origin;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_UBEMGh6QZ',
      userPoolClientId: '7buka73d2s7h5bn6aiveutqv9n',
      loginWith: {
        oauth: {
          domain: 'us-east-1ubemgh6qz.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'email', 'phone', 'profile'],
          redirectSignIn: [origin, origin + '/'],
          redirectSignOut: [origin, origin + '/'],
          responseType: 'code'
        }
      }
    }
  }
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
