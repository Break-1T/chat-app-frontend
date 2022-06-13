import { Inject, inject, Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { JsonPipe } from '@angular/common';
import { jsDocComment } from '@angular/compiler';
import {ResponseMessage} from "src/app/Models/ResponseMessage"

@Injectable({
  providedIn: 'any',
})
export class ChatService {

  private groupId: string;
  private userName: string;

  private hubConnection: signalR.HubConnection | undefined;

  public messages = new Array<ResponseMessage>();

  public constructor(@Inject('groupId')groupId: string,
                     @Inject('userName')userName:string) 
  {
    this.groupId = groupId; 
    this.userName = userName;
  }

public async CreateConnection()
{
  this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.hubConnectionURL.replace("{{groupId}}", this.groupId))
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection.onclose(async () => {
    await this.start();
  });
  this.hubConnection.on("SendMessage", (userName: string, message:string) => this.mapReceivedMessage(userName, message));
}

public async SendMessage(userName: string, message:string)
{
  await this.hubConnection?.send("SendMessage", userName, message);
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

  private mapReceivedMessage(userName: string, message: string): void 
  {
    this.messages.push({userName: userName, message: message});
    console.log(message);
  }
}