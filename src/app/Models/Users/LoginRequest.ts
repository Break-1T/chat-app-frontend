import 'reflect-metadata';
import {JsonProperty, JsonObject, PropertyConvertingMode} from "json2typescript";

@JsonObject("LoginRequest")
export class LoginRequest {

  @JsonProperty("email", String, PropertyConvertingMode.MAP_NULLABLE)
  public Email!: string;

  @JsonProperty("password", String, PropertyConvertingMode.MAP_NULLABLE)
  public Password!: string;
}
