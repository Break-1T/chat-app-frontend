import 'reflect-metadata';
import { User } from './User';
import {JsonProperty, JsonObject, PropertyConvertingMode} from "json2typescript";

@JsonObject("CreateUser")
export class CreateUser extends User
{
  @JsonProperty("email", String, PropertyConvertingMode.MAP_NULLABLE)
  public Email!: string;

  @JsonProperty("user_name", String, PropertyConvertingMode.MAP_NULLABLE)
  public UserName!: string;

  @JsonProperty("password", String, PropertyConvertingMode.MAP_NULLABLE)
  public Password!: string;
}
