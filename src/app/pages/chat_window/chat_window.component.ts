import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { ChatService } from "src/app/services/chat.service";
import { GroupService } from '../../services/Group.service';
import { Group } from '../../Models/Groups/Group';
import { AutorizeService } from 'src/app/services/Autorize.service';

@Component({
    selector:"app-chat-window",
    templateUrl:"./chat_window.component.html",
    styleUrls:["./chat_window.component.css"],
})
export class ChatWindowComponent implements OnInit{
    groupId:string = "";
    message: string = "";
    userName:string = "";

    public Groups!: Array<Group> | null;
    /**
     *
     */
    constructor(private authService: AutorizeService,
                private router: Router,
                private groupService: GroupService)
    {
    }

    SelectGroup(event:any, selectedGroup:Group){
      console.log(selectedGroup.GroupName);
    }

    async ngOnInit(){

      (async () => {
        var groups: Array<Group> | null = await this.groupService.GetGroups();

        this.Groups = groups;
      })();
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
