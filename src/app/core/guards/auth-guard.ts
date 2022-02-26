import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

/**
 * canActivate --> Recebe a rota em si e o estado da rota. Serve para definir ser o usuário pode ou n 
 *                 acessar a rota;
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService :AuthService, private router :Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    :boolean | Observable<boolean> {

    console.log("Guarda de rota autenticação");

    if (!this.authService.getUserAutenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
