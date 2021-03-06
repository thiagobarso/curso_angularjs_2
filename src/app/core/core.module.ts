import { Title } from '@angular/platform-browser';
import { CategoriasService } from './../categorias/categorias.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { ErrorHandlerService } from './error-handler.service';

import { ConfirmationService } from 'primeng/components/common/api';
import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentosService } from './../lancamentos/lancamentos.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { AuthService } from './../seguranca/auth.service';
import { JwtHelper } from 'angular2-jwt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
    RouterModule],
  providers: [
    ErrorHandlerService,
    LancamentosService,
    PessoasService,
    CategoriasService,
    AuthService,
    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
