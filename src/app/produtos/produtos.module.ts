import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProdutosCadastroComponent
  ],
  exports :[
    ProdutosCadastroComponent
  ]
})
export class ProdutosModule { }
