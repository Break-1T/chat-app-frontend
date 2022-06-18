import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from './../Models/Users/CreateUser';
import { Injectable } from '@angular/core';
import { AppConstants } from '../Constants/AppConstants';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/Users/User';
import { JsonConvert } from "json2typescript";

@Injectable({
  providedIn: 'any'
})
export class UserService {

constructor(private http: HttpClient) { }

  public async CreateUserAsync(createUserRequest: CreateUser | undefined) : Promise<User | null>
  {
    if (createUserRequest === null)
    {
      throw new Error("'createUserRequest' has null value!");
    }
    try
    {
      var user:User | null = null;

      var jsonConverter = new JsonConvert();
      var json = jsonConverter.serialize(createUserRequest as CreateUser);

      var url = environment.chatApiUrl.concat(AppConstants.CreateUserPath);

      var header = new HttpHeaders();
      header.set('Content-Type', 'application/json');

      var result = this.http.post<User>(url, json, { headers : header });

      return await firstValueFrom(result, {defaultValue: null})

    } catch (error)
    {
      console.log(error);
      return null;
    }
  }
}
