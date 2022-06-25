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

  constructor(private _chatService: ChatService) { }

  @Input()
  public Group:Group | undefined = undefined;

  public message: string = "";
  public array! : Array<ResponseMessage> | null;

  async sendMessageClick(evt:any)
  {
    await this._chatService.SendMessage(this.message);
    this.message = "";
  }

//  async enterCLick(evt:any)
//  {
//     // if(evt.key === "Enter")
//     // {
//     //   await this.SendMessage(this.message)
//     // }
//  }

  ngOnInit(){

      this.array = this._chatService.messages;
  }

}
