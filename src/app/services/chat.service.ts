import { LocalStorageService } from './local-storage.service';
import { JsonConvert } from 'json2typescript';
import { User } from './../Models/Users/User';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { JsonPipe } from '@angular/common';
import { jsDocComment } from '@angular/compiler';
import {ResponseMessage} from "src/app/Models/ResponseMessage"
import { AppConstants } from '../Constants/AppConstants';
import { GroupService } from './Group.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private hubConnection: signalR.HubConnection | undefined = undefined;

  public messages = new Array<ResponseMessage>();

  private User: User | undefined = undefined;
  private groupId: string | null = null;

  public constructor( private _httpClient: HttpClient,
                      private _groupService: GroupService,
                      private _localStorage: LocalStorageService)
  {
    console.info("Chat service created");
  }

  public async TryEnterGroup(groupId: string) : Promise<boolean>
  {
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.TryConnectPath.replace("{{group_id}}", groupId));

      var token = this._localStorage.get("token");
      if(token === null)
      {
        throw new Error("NotAutorized");
      }

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      var result = this._httpClient.post<string | null>(url, null, { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null});
      var user:User | null = new JsonConvert().deserializeObject(stringResult, User);

      if (user === null)
      {
        return false;
      }

      this.User = user;
      this.groupId = groupId;

      return true;

    } catch (error)
    {
      console.log(error);
      return false;
    }
  }

  public async TryLeaveGroup() : Promise<boolean>
  {
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.LeaveGroupPath.replace("{{group_id}}", this.groupId as string));

      var token = this._localStorage.get("token");
      if(token === null)
      {
        throw new Error("NotAutorized");
      }

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      var result = this._httpClient.post<string | null>(url, null, { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null});

      if (stringResult)
      {
        return false;
      }

      return true;

    } catch (error)
    {
      console.log(error);
      return false;
    }
  }

  public async CreateConnection()
  {
    var url = environment.hubConnectionURL.replace("{{groupId}}", this.groupId as string);
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubConnectionURL.replace("{{groupId}}", this.groupId as string),
      {
        // accessTokenFactory: () => this._localStorage.get("token") as string
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

      // this.hubConnection.onclose(async () =>
      // {
      //   await this.start();
      // });

    this.hubConnection.on("SendMessage", (userName: User, message:string) => this.mapReceivedMessage(userName, message));

    this.start();
  }

  public async SendMessage(message:string | undefined)
  {
     await this.hubConnection?.send("SendMessage", this.User, message as string);
  }

  // Strart the connection
  public async start()
  {
    try
    {
      await this.hubConnection?.start();
      console.log("connected");
    } catch (err)
    {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user:User, message: string): void
  {
    this.messages.push({user: user, message: message});
    console.log(message);
  }

  public async disconnect()
  {
    this.messages.splice(0);
    await this.hubConnection?.stop();
  }
}
