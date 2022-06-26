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
    public Groups: Array<Group> | null = new Array<Group>();
    public SelectedGroup: Group | undefined = undefined;

    constructor(private groupService: GroupService,
                private chatService: ChatService,
                public dialog: MatDialog)
    {
    }

    async SelectGroup(event:any, selectedGroup:Group): Promise<any>
    {
      this.chatService.disconnect();

      this.SelectedGroup = selectedGroup;
      var result = await this.chatService.TryEnterGroup(selectedGroup.GroupId as string);

      if (result === null)
      {
        return;
      }

      await this.chatService.CreateConnection();
      console.log(selectedGroup.GroupName);
    }

    openCreateGroupDialog()
    {
      var dialogRef = this.dialog.open(CreateGroupDialogComponent);
      dialogRef.afterClosed().subscribe(async component =>
        {
            if(dialogRef.componentInstance.GroupAdded)
            {
              this.Groups?.splice(0);

              var result = await this.groupService.GetGroups();

              if(result === null){
                result = new Array<Group>();
              }

              result.forEach(x => this.Groups?.push(x))
            }
        });
    }

    async ngOnInit(){

      (async () => {
        var groups: Array<Group> | null = await this.groupService.GetGroups();

        this.Groups = groups;
      })();
    }
}
