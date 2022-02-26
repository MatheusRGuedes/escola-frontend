import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public showMenuEmitter = new EventEmitter<boolean>();

  private userAutenticated :boolean = false;

  constructor(private router :Router) { }

  getUserAutenticated() {
    return this.userAutenticated;
  }

  doLogin(user :User) :boolean  {
    if (user.email === 'teste@gmail.com' 
      && user.password === '12345') {
        this.userAutenticated = true;
        
        this.router.navigateByUrl('/home');

        this.showMenuEmitter.emit(true);

        return true;
    } else {
      this.userAutenticated = false;

      this.showMenuEmitter.emit(false);

      return false;
    }
  }
}
