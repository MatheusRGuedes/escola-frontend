import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessoresListagemComponent } from './professores-listagem/professores-listagem.component';
import { ProfessoresComponent } from './professores/professores.component';

const routes: Routes = [
  { path: 'novo', component: ProfessoresComponent },
  { path: 'editar/:id', component: ProfessoresComponent },

  { path: '', component: ProfessoresListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessoresRoutingModule { }
