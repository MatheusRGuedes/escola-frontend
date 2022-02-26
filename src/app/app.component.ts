import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = '';

  showMenu :boolean = false;

  constructor(private authService :AuthService) {
    //receberá a notificação (boolean) quando o evento for emitido
    this.authService.showMenuEmitter.subscribe(notify => {
      this.showMenu = notify;
    });
  }
}