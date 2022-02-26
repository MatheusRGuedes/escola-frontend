import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
//Components
import { TabelaComponent } from './components/tabela/tabela.component';
import { AlertComponent } from './components/alert/alert.component';
import { PopoverComponent } from './components/popover/popover.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
//Pipes
import { TypeofPipe } from './pipes/typeof.pipe';
import { ObjectToStringPipe } from './pipes/object-to-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forChild()
  ],
  declarations: [
    TabelaComponent, 
    AlertComponent, 
    PopoverComponent, 
    EnderecoComponent,
    TypeofPipe, 
    ObjectToStringPipe
  ],
  exports: [
    TabelaComponent,
    AlertComponent,
    PopoverComponent, 
    TypeofPipe,
    EnderecoComponent
  ]
})
export class SharedModule { }
