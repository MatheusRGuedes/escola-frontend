import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresRoutingModule } from './professores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { ProfessoresListagemComponent } from './professores-listagem/professores-listagem.component';
import { ProfessoresComponent } from './professores/professores.component';
import { NgxMaskModule } from 'ngx-mask';

/**
 * forChild() --> DIZ PARA O ANGULAR QUE É PARA USAR A MESMA INSTÂNCIA definida no arquino root
 */

@NgModule({
  declarations: [
    ProfessoresComponent,
    ProfessoresListagemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessoresRoutingModule,
    SharedModule,
    NgxMaskModule.forChild()
  ]
})
export class ProfessoresModule { }
