import { Router } from '@angular/router';
import { AutorizeService } from 'src/app/services/Autorize.service';
import { Component } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { HttpClient } from '@angular/common/http';
import { OnInit } from "@angular/core";
@Component({
    selector:"app-chat-window",
    templateUrl:"./chat_window.component.html",
    styleUrls:["./chat_window.component.css"],
})
export class ChatWindowComponent implements OnInit{
    groupId:string = "";
    message: string = "";
    userName:string = "";

    /**
     *
     */
    constructor(private authService: AutorizeService,
      private router: Router) {
    }

    ngOnInit(){
    }

    Chat:ChatService | undefined;

    StartConnection()
    {
        this.Chat = new ChatService(this.groupId, this.userName);
        this.Chat.CreateConnection();
        this.Chat?.start();
    }

    SendMessage(){
        this.Chat?.SendMessage(this.userName, this.message);
    }

    async Logout(){
      this.authService.Logout();
      this.router.navigateByUrl("/login");
    }
}
