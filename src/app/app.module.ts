import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from './shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfessoresModule } from './professores/professores.module';

//Serviços
import { DisciplinasService } from './disciplinas/disciplinas.service';
import { ProfessorService } from './professores/professor.service';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/guards/auth-guard';

/**seta a localização da aplicação -- PESQUISAR*/
import { LOCALE_ID } from '@angular/core'; 
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

/*
  providers --> informa pr os demais componentes do módulo App, q os serviços estão disponiveis para o uso
  forRoot   --> Permite carregar um módulo de maneira rápida, qnd o aplicativo é iniciado. Permite acessar
                o provedor d qualquer ponto do aplicativo, q n seja carregado lentamente.
  forChild  --> Usado pra carregar o provedor no módulos filhos, de maneira lenta (sob demanda), contrário
                do forRoot. No final, o provedor virá dele.
*/

@NgModule({
  declarations: [
    AppComponent,
    DisciplinasComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    ProfessoresModule
  ],
  providers: [
    DisciplinasService, 
    ProfessorService,
    AuthService,
    AuthGuard,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
