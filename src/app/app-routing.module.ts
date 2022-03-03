import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth-guard';

import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfessoresListagemComponent } from './professores/professores-listagem/professores-listagem.component';
import { ProfessoresComponent } from './professores/professores/professores.component';

/*
  Arquivo do nível do topo

  appRoutes            --> Objeto do tipo routes que vai armazenas objetos contendo todas as rotas disponíveis;
                       --> Rota raiz da aplicação, usada para navegação entre as páginas do projeto 
  RouterModule.forRoot --> irá configurar o mudulo e disponibilizar as rotas
                       --> Qnd o softaware é executado, o angular busca uma combinação da URL no browser com as rotas definidas(de
                           cima para baixo), chamando o shell component (appComponent);
                       --> opcs: (enableTracing: true - habilita log visualizar rotas)
*/

const appRoutes : Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'disciplinas', component: DisciplinasComponent, canActivate: [AuthGuard] },
  { 
    path: 'professores', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./professores/professores.module').then(m => m.ProfessoresModule)
  },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
