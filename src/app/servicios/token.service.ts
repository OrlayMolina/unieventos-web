import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

const TOKEN_KEY = 'AuthToken';
const REFRESH_TOKEN_KEY = 'RefreshToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  public setToken(token: string, refresh: string) {
    window.sessionStorage.clear();
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

  public login(token: string, refresh: string) {
    this.setToken(token, refresh);
    const rol = this.getRol();
    let destino = rol == 'ADMINISTRADOR' ? '/gestion-eventos' : '/';
    this.router.navigate([destino]).then(() => {
      window.location.reload();
    });
  }

  public logout() {
    window.sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/']);
      window.location.reload();
    }, 1000);
  }

  public decodePayload(token: string): any {
    const payload = token.split('.')[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('utf-8');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return '';
  }

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return '';
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.email;
    }
    return '';
  }
}
