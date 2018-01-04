import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoasService, PessoasFiltro } from './../pessoas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;

  filtro = new PessoasFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoasService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(() => {
        console.log('Excluído');
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;

        }
        this.toasty.success('Pessoa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any) {
    let status: boolean;
    let msg: string;
    if (pessoa.ativo) {
      status = false;
      msg = "desativada";
    } else {
      status = true;
      msg = "ativada";
    }
    this.pessoasService.mudarStatus(pessoa.codigo, status)
      .then(() => {
        console.log('Excluído');
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;

        }
        this.toasty.success(`Pessoa ${msg} com sucesso!`);
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }

}