import { Group } from './../../Models/Groups/Group';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input()
  public Group!: Group;
  public imagePath!: SafeResourceUrl | null;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.Group.GroupImage);
  }

}
