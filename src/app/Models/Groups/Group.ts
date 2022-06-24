import 'reflect-metadata';
import { User } from './../Users/User';
import { JsonObject, JsonProperty, PropertyConvertingMode } from 'json2typescript';

@JsonObject("Group")
export class Group
{
  constructor() {}
  @JsonProperty("group_id", String, PropertyConvertingMode.PASS_NULLABLE)
  public GroupId: string | null = null;

  @JsonProperty("group_name", String, PropertyConvertingMode.PASS_NULLABLE)
  public GroupName: string | null = "";

  @JsonProperty("group_image", String, PropertyConvertingMode.PASS_NULLABLE)
  public GroupImage: string | null = "";

  @JsonProperty("users", [User], PropertyConvertingMode.PASS_NULLABLE)
  public Users: User[] | null = null;
}
