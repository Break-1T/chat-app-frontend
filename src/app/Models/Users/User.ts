import 'reflect-metadata';
import {JsonProperty, JsonObject, PropertyConvertingMode} from "json2typescript";

@JsonObject("User")
export class User
{
  @JsonProperty("id", String, PropertyConvertingMode.MAP_NULLABLE)
  public Id!: string | null;

  @JsonProperty("first_name", String, PropertyConvertingMode.MAP_NULLABLE)
  public FirstName!: string | null;

  @JsonProperty("last_name", String, PropertyConvertingMode.MAP_NULLABLE)
  public LastName!: string | null;

  @JsonProperty("photo", String, PropertyConvertingMode.MAP_NULLABLE)
  public Photo!: Uint8Array | null;
}
