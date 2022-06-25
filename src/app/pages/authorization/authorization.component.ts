import { LoginRequest } from '../../Models/Users/LoginRequest';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizeService } from 'src/app/services/Autorize.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public LoginRequest: LoginRequest = new LoginRequest();

  constructor(private _authService: AutorizeService,
               private router: Router)
  {
  }

  public async login(evt:any): Promise<any>
  {
    try
    {
      var result = await this._authService.Login(this.LoginRequest);

      if (result === false)
      {
        throw new Error("cant login");
      }

      this.router.navigateByUrl('/chat');

    } catch (error)
    {
      console.log(error);
      this.router.navigateByUrl('/error');
    }
  }

  ngOnInit(): void {
  }

}
