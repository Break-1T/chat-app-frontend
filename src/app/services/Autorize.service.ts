import { AppConstants } from './../Constants/AppConstants';
import { CreateUser } from './../Models/Users/CreateUser';
import { Inject, inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'any',
})
export class AutorizeService
{
  public constructor(private http: HttpClient)
  {
  }

  public Login(email: any, password: any)
  {
    return this.http.post<CreateUser>('/api/login', {email, password});
  }

  public SignUp(createUserRequset: CreateUser)
  {
    return this.http.post<CreateUser>(environment.chatApiUrl + AppConstants.CreateUserPath, JSON.stringify(createUserRequset));
  }
}
