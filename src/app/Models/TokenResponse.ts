import 'reflect-metadata';
import { jsonName } from "ts-serializable";

export class TokenResponse {

  @jsonName("access_token")
  public AccessToken: string | undefined;

  @jsonName("refresh_token")
  public RefreshToken: string | undefined;

  @jsonName("expires_in")
  public ExpirationTime: number | undefined;
}
