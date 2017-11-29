import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PessoasCadastroComponent ],
  exports: [ PessoasCadastroComponent ]
})
export class PessoasModule { }
