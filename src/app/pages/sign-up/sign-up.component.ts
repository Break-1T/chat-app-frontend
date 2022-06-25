import { AutorizeService } from 'src/app/services/Autorize.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/Models/Users/CreateUser';
import { User } from 'src/app/Models/Users/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{
  public User:CreateUser = new CreateUser();

  constructor(private _authService:AutorizeService,
              private router: Router)
  {
  };

  public async SignUp(evt:any): Promise<any>
  {
    try
    {
      var result = await this._authService.SignUp(this.User);

      if (result === null)
      {
        throw new Error("cant create user");
      }

      this.router.navigateByUrl('/login');

      let jsonResult = JSON.stringify(result);
      console.log(`User created: ${jsonResult}`);

    } catch (error)
    {
      console.log(error);
      this.router.navigateByUrl('/error');
    }
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any)
  {
    this.User.Photo = btoa(e.target.result);
  }

  async ngOnInit(): Promise<any>
  {
    var response = await fetch('/assets/default_user_image.jpg');
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(await response.blob());
  }
}
