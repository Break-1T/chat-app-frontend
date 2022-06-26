import { User } from 'src/app/Models/Users/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../Constants/AppConstants';
import { JsonConvert } from 'json2typescript';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient, private storage: LocalStorageService)
  {
  }
  public async GetUsersAsync() : Promise<Array<User>>
  {
    try
    {
      var url = environment.chatApiUrl.concat(AppConstants.GetUsersPath);

      var token = this.storage.get("token");
      if(token === null)
      {
        throw new Error("NotAutorized");
      }

      var header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      var result = this.http.get<any | null>(url, { headers : header });
      var stringResult = await firstValueFrom(result, { defaultValue: null });
      var users: Array<User> | null = new JsonConvert().deserializeArray(stringResult, User);

      if(users === null)
      {
        throw new Error();
      }

      return users;
    } catch (error)
    {
      console.log(error);
      return new Array<User>();
    }
  }
}
