import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  expiresAt: any;
  token: any;
  authenticated: boolean;

  constructor() {}

  login() {
    this.auth0.authorize();
  }

  handleLoginCallback(): Observable<any> {
    return this.auth0.parseHash((error, authResult) =>
      of({ error, authResult })
    );
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.token = authResult.accessToken;
    this.authenticated = true;
  }

  logout() {
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: environment.auth.clientID
    });
  }

  get isLoggedIn() {
    // Check if current date is before token
    // expiration and user is signed in locally
    return of(Date.now() < this.expiresAt && this.authenticated);
  }
}
