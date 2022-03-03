import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user :User = new User();
  public emailValidation :string = "";
  public passwordValidation :string = "";
  public isInvalidUser :boolean = false;
  loginForm :FormGroup;

  constructor(public fb :FormBuilder, public authService :AuthService) {
    this.loginForm = fb.group({
      email: ['teste@gmail.com', [
          Validators.email, 
          Validators.required
        ]
      ],
      password: ['12345', Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem("isLogged", "false");
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submitData() {
    this.emailValidation = "";
    this.passwordValidation = "";
    
    if (!this.loginForm.valid) {
      if (this.email?.errors?.required)
        this.emailValidation = 'Insira um email.';
      else if (this.email?.errors?.email)
        this.emailValidation = 'Insira um email válido.';

      if (this.password?.errors?.required)
        this.passwordValidation =  'Insira uma senha.';

      this.isInvalidUser = false;
    
    } else {
      this.user.email = this.email?.value;
      this.user.password = this.password?.value;
      console.log(this.user);

      if (!this.authService.doLogin(this.user)) 
        this.isInvalidUser = true;
    }
  }
}
