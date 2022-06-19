import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'any',
})
export class JWTTokenService {

  jwtToken!: string;
  decodedToken!: { [key: string]: string };

  constructor(private jwtHelper:JwtHelperService) {
  }

  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() : void
  {
    if (this.jwtToken) {
    this.decodedToken = this.jwtHelper.decodeToken(this.jwtToken);
    }
  }

  getDecodeToken() : string
  {
    return this.jwtHelper.decodeToken(this.jwtToken);
  }

  getUser() : string | null
  {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  getExpiryTime() : string | null
  {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = Number(this.getExpiryTime());
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
