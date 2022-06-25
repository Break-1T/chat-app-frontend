import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer) { }

  @Input()
  public profile!: SafeResourceUrl | null;

  @Input()
  public message!: string | null;

  @Input()
  public time!: string | null;

  ngOnInit(): void {
    this.profile = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.profile);
  }

}
