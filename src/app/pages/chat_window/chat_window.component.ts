import { CreateGroupDialogComponent } from './../../Components/create-group-dialog/create-group-dialog.component';
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { ChatService } from "src/app/services/chat.service";
import { GroupService } from '../../services/Group.service';
import { Group } from '../../Models/Groups/Group';
import { AutorizeService } from 'src/app/services/Autorize.service';
import { MatDialog } from '@angular/material/dialog';

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

    constructor(private groupService: GroupService,
                public dialog: MatDialog)
    {
    }

    SelectGroup(event:any, selectedGroup:Group){
      console.log(selectedGroup.GroupName);
    }

    openCreateGroupDialog()
    {
      var dialogRef = this.dialog.open(CreateGroupDialogComponent);
      dialogRef.afterClosed().subscribe(async component =>
        {
            if(dialogRef.componentInstance.GroupAdded)
            {
                this.Groups = await this.groupService.GetGroups();;
            }
        });
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
}
