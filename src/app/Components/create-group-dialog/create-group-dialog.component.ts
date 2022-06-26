import { UserService } from './../../services/user.service';
import { GroupService } from './../../services/Group.service';
import { Group } from './../../Models/Groups/Group';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/Models/Users/User';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {

  Group: Group = new Group();
  GroupAdded: boolean = false;

  public Users: Array<User> = new Array<User>;
  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]> = new Observable<User[]>;

  constructor(
    private _groupService: GroupService,
    private _userService: UserService)
  {
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  async ngOnInit(): Promise<any>
  {
    this.Users = await this._userService.GetUsersAsync();

    this.InitUserFilters();

    this.Group.GroupName = "My Group";
    this.Group.Users = new Array<User>();
    var response = await fetch('/assets/default_group_image.jpg');
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(await response.blob());
  }

  public InitUserFilters()
  {
    this.myControl = new FormControl<string | User>('');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.UserName)),
      map(name => (name ? this._filter(name) : this.Users.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.UserName ? user.UserName : '';
  }

  private _filter(name: string): User[]
  {
    const filterValue = name.toLowerCase();

    return this.Users.filter(option => option.UserName?.toLowerCase().includes(filterValue));
  }

  public onAddUser(evt:any, selectedUser:User)
  {
    this.Group.Users?.push(selectedUser);
    this.Users = this.Users.filter(item => item.Id !== selectedUser.Id);
    this.InitUserFilters();
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
