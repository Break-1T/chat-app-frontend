import { Group } from './../Models/Groups/Group';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../Constants/AppConstants';
import { firstValueFrom } from 'rxjs';
import { Any, JsonConvert } from 'json2typescript';
import 'reflect-metadata';

@Injectable({
  providedIn: 'any'
})
export class GroupService
{

  public constructor(private http: HttpClient, private storage: LocalStorageService)
  {
  }

  public async GetGroups() : Promise<Array<Group> | null>
  {
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.GetGroupsPath);

      var token = this.storage.get("token");
      if(token === null)
      {
        throw new Error("NotAutorized");
      }

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      var result = this.http.get<any | null>(url, { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null });
      var groups: Array<Group> = new JsonConvert().deserializeArray(stringResult, Group);

      if(groups === null)
      {
        throw new Error();
      }

      return groups;
    } catch (error)
    {
      console.log(error);
      return null;
    }
  }

  public async CreateGroup(createGroupRequest: Group | undefined) : Promise<Group | null>
  {
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.CreateGroupPath);

      var token = this.storage.get("token");
      if(token === null)
      {
        throw new Error("NotAutorized");
      }

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      var result = this.http.post<any | null>(url, new JsonConvert().serialize(createGroupRequest as Group, Group), { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null });
      var group: Group | null = new JsonConvert().deserializeObject(stringResult, Group);

      if(group === null)
      {
        throw new Error();
      }

      return group;
    } catch (error)
    {
      console.log(error);
      return null;
    }
  }
}
