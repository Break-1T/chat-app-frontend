export class AppConstants
{
  public static readonly AuthPath: string = "/api/user/login";
  public static readonly CreateUserPath: string = "/api/user/signup";
  public static readonly UpdateUserPath: string = "/api/user/update";
  public static readonly GetUsersPath: string = "/api/user/list";

  public static readonly CreateGroupPath: string = "/api/group/create";
  public static readonly GetGroupsPath: string = "/api/group/list";
  public static readonly UpdateGroupPath: string = "/api/group/update";
  public static readonly LeaveGroupPath: string = "/api/group/leave/{{group_id}}";

  public static readonly TryConnectPath: string = "/api/chat/{{group_id}}";
}
