import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
    { path: 'pessoas', component: PessoasPesquisaComponent },
    { path: 'pessoas/nova', component: PessoasCadastroComponent },
    { path: 'pessoas/:codigo', component: PessoasCadastroComponent }    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PessoasRoutingModule { }