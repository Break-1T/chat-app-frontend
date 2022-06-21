import { User } from './../Models/Users/User';
import { LoginRequest } from './../Models/Users/LoginRequest';
import { LocalStorageService } from './local-storage.service';
import { TokenResponse } from './../Models/TokenResponse';
import { AppConstants } from './../Constants/AppConstants';
import { CreateUser } from './../Models/Users/CreateUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { JsonConvert, PropertyMatchingRule } from 'json2typescript';
import 'reflect-metadata';

@Injectable({
  providedIn: 'any',
})
export class AutorizeService
{
  public constructor(private http: HttpClient, private storage: LocalStorageService)
  {
  }

  public async Login(loginRequest: LoginRequest | null) : Promise<boolean>
  {
    if (loginRequest === null)
    {
      throw new Error("'createUserRequest' has null value!");
    }
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.AuthPath);

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var result = this.http.post<string | null>(url, new JsonConvert().serialize(loginRequest), { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null });
      var token: TokenResponse | null = new JsonConvert().deserializeObject(stringResult, TokenResponse);

      if(token === null)
      {
        throw new Error();
      }

      this.storage.set("token", token.AccessToken);
      return true;
    } catch (error)
    {
      console.log(error);
      return false;
    }
  }

  public Logout() : void
  {
    try
    {
      this.storage.remove("token");
    } catch (error)
    {
      console.log(error);
    }
  }

  public async SignUp(createUserRequest: CreateUser | undefined) : Promise<User | null>
  {
    if (createUserRequest === null)
    {
      throw new Error("'createUserRequest' has null value!");
    }
    try
    {
      var jsonConverter = new JsonConvert();
      var json = jsonConverter.serialize(createUserRequest as CreateUser);

      var url = environment.chatApiUrl.concat(AppConstants.CreateUserPath);

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var result = this.http.post<string | null>(url, json, { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null });

      var user: User = new JsonConvert().deserializeObject(stringResult, User);

      if(user === null)
      {
        throw new Error();
      }

      return user;

    } catch (error)
    {
      console.log(error);
      return null;
    }
  }
}
