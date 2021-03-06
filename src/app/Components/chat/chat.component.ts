import { Group } from './../../Models/Groups/Group';
import { ChatService } from './../../services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { ResponseMessage } from 'src/app/Models/ResponseMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private _chatService: ChatService)
  {
  }

  @Input()
  public Group:Group | undefined = undefined;

  public message: string = "";
  public array! : Array<ResponseMessage> | null;
  public leaveVisibility: string = "";

  async leaveGroupClick(evt:any): Promise<any>
  {
    await this._chatService.TryLeaveGroup();
  }

  async sendMessageClick(evt:any)
  {
    await this._chatService.SendMessage(this.message);
    this.message = "";
  }

  ngOnInit()
  {
    this.leaveVisibility = `visibility: ${this.Group === undefined ? "hidden;" : "visible;"}`;
    this.array = this._chatService.messages;
  }

}
