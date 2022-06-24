import { GroupService } from './../../services/Group.service';
import { Group } from './../../Models/Groups/Group';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {

  Group: Group = new Group();
  GroupAdded: boolean = false;

  constructor(private _groupService: GroupService)
  {
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  async ngOnInit(): Promise<any>
  {
    this.Group.GroupName = "My Group";

    var response = await fetch('/assets/default_group_image.jpg');
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(await response.blob());
  }

  public async onClickCreate(evt:any) : Promise<any>
  {
    var result = await this._groupService.CreateGroup(this.Group);

    if(result === null)
    {
      this.GroupAdded = false;
    }

    this.GroupAdded = true;
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any)
  {
    this.Group.GroupImage = btoa(e.target.result);
  }
}
