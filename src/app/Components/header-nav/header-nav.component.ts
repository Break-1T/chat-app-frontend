import { Router } from '@angular/router';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AutorizeService } from 'src/app/services/Autorize.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit
{
  @Input()
  private _profilePhoto!: string | null;

  constructor(private _authService: AutorizeService,
              private _router: Router)
  {
  }

  Logout()
  {
    this._authService.Logout();
    this._router.navigateByUrl("/login");
  }
  ngOnInit(): void {
  }

}
