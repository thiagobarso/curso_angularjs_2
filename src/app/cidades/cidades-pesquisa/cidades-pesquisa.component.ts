import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { CidadesService, CidadeFiltro } from './../cidades.service';

@Component({
  selector: 'app-cidades-pesquisa',
  templateUrl: './cidades-pesquisa.component.html',
  styleUrls: ['./cidades-pesquisa.component.css']
})
export class CidadesPesquisaComponent implements OnInit {

  totalRegistros = 0;

  filtro = new CidadeFiltro();
  cidades = [];
  @ViewChild('tabela') grid;

  dataVencimentoInicio : Date;

  dataVencimentoFim: Date;

  constructor(
    private cidadeService: CidadesService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.cidadeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.cidades = resultado.cidades;
      })
      .catch( erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(cidade: any){
    this.confirmation.confirm({
      message : 'Tem certeza que deseja excluir?',
      accept : () =>{
        this.excluir(cidade);
      }
    });
  }

  excluir(cidade: any){
    this.cidadeService.excluir(cidade.codigo)
    .then(() =>{
      console.log('Excluído');
      if(this.grid.first === 0){
        this.pesquisar();
      }else{
        this.grid.first = 0;

      }
      this.toasty.success('Item excluído com sucesso!');
    })
    .catch( erro => this.errorHandler.handle(erro));
  }
}