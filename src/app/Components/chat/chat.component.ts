import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  public array! : Array<string> | null;

  ngOnInit(){

      this.array = new Array(
        "message_1", "message_2", "message_3", "message_4", "message_5"
      );
  }

}
