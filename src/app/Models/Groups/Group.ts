import 'reflect-metadata';
import { User } from './../Users/User';
import { jsonName } from "ts-serializable";

export class Group
{
  @jsonName("group_id")
  public GroupId!: string | null;

  @jsonName("group_name")
  public GroupName!: string | null;

  @jsonName("group_image")
  public GroupImage!: Uint8Array | null;

  @jsonName("users")
  public Users!: Array<User> | null;
}
