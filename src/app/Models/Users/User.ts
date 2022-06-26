import 'reflect-metadata';
import {JsonProperty, JsonObject, PropertyConvertingMode} from "json2typescript";

@JsonObject("User")
export class User
{
  @JsonProperty("id", String, PropertyConvertingMode.PASS_NULLABLE)
  public Id: string | null = null;

  @JsonProperty("first_name", String, PropertyConvertingMode.PASS_NULLABLE)
  public FirstName: string | null = "";

  @JsonProperty("last_name", String, PropertyConvertingMode.PASS_NULLABLE)
  public LastName: string | null = "";

  @JsonProperty("photo", String, PropertyConvertingMode.PASS_NULLABLE)
  public Photo: string | null = "";

  @JsonProperty("user_name", String, PropertyConvertingMode.MAP_NULLABLE)
  public UserName: string = "";
}
