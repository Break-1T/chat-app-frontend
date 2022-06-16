import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/Models/Users/CreateUser';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private _userService:UserService,
              private router: Router)
  {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
    });
  }

  public SugnUp(): any
  {
    try
    {
      var formValue = this.form.value;

      var createUserRequest = new CreateUser();
      createUserRequest.Email = formValue.email as string;
      createUserRequest.Password = formValue.password as string;
      createUserRequest.UserName = formValue.userName as string;
      createUserRequest.FirstName = formValue.firstName as string;
      createUserRequest.LastName = formValue.lastName as string;

      var result = this._userService.CreateUserAsync(createUserRequest);

      if (result === null)
      {
        throw new Error("cant create user");
      }

      let jsonResult = JSON.stringify(result);
      console.log(`User created: ${jsonResult}`);

    } catch (error)
    {
      console.log(error);
    }
  }
  ngOnInit(): void {
  }

}
