import { CidadesCadastroComponent } from './cidades-cadastro/cidades-cadastro.component';
import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'cidade',
    component: CidadesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles : ['ROLE_PESQUISAR_CIDADE']}
  },
  {
    path: 'cidade/novo',
    component: CidadesCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles : ['ROLE_CADASTRAR_CIDADE']}
  },
  {
    path: 'cidade/:codigo',
    component: CidadesCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles : ['ROLE_CADASTRAR_CIDADE']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CidadesRoutingModule { }