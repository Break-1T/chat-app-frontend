import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer) { }

  public profileImg!: SafeResourceUrl | null;

  @Input()
  public profile!: string | null;

  @Input()
  public message!: string | null;

  @Input()
  public time!: string | null;

  ngOnInit(): void {
    this.profileImg = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.profile);
  }

}
