import { LoginRequest } from './../../Models/Users/LoginRequest';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorizeService } from 'src/app/services/Autorize.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder,
               private _authService: AutorizeService,
               private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  public async login(): Promise<any>
  {
    try
    {
      var formValue = this.form.value;

      var loginRequest = new LoginRequest();
      loginRequest.Email = formValue.email as string;
      loginRequest.Password = formValue.password as string;

      var result = await this._authService.Login(loginRequest);

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
