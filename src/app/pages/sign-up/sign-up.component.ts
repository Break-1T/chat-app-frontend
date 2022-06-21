import { AutorizeService } from 'src/app/services/Autorize.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/Models/Users/CreateUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private _authService:AutorizeService,
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

  public async SignUp(): Promise<any>
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

      var result = await this._authService.SignUp(createUserRequest);

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

  ngOnInit(): void {
  }
}
