import 'reflect-metadata';
import {JsonProperty, JsonObject, PropertyConvertingMode} from "json2typescript";

@JsonObject("LoginRequest")
export class LoginRequest {

  @JsonProperty("user_name", String, PropertyConvertingMode.MAP_NULLABLE)
  public UserName: string = "";

  @JsonProperty("password", String, PropertyConvertingMode.MAP_NULLABLE)
  public Password: string = "";
}
