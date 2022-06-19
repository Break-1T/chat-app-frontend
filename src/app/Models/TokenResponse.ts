import { JsonObject, JsonProperty, PropertyConvertingMode } from 'json2typescript';
import 'reflect-metadata';

@JsonObject("TokenResponse")
export class TokenResponse {

  @JsonProperty("access_token", String, PropertyConvertingMode.MAP_NULLABLE)
  public AccessToken: string = "";

  @JsonProperty("refresh_token", String, PropertyConvertingMode.MAP_NULLABLE)
  public RefreshToken: string = "";

  @JsonProperty("expires_in", Number, PropertyConvertingMode.MAP_NULLABLE)
  public ExpiresIn: number = 0;

  @JsonProperty("token_type", String, PropertyConvertingMode.MAP_NULLABLE)
  public TokenType: string = "";

  @JsonProperty("scope", String, PropertyConvertingMode.MAP_NULLABLE)
  public Scope: string = "";
}
