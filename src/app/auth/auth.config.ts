import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UBEMGh6QZ',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: '7buka73d2s7h5bn6aiveutqv9n',
    scope: 'email openid phone',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  }
};
