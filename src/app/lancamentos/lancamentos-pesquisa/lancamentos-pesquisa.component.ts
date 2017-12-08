import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao : string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  lancamentos = [];

  constructor(private lancamentoService: LancamentosService) { }
  
  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao : this.descricao,
      dataVencimentoInicio : this.dataVencimentoInicio,
      dataVencimentoFim : this.dataVencimentoFim
    }
    this.lancamentoService.pesquisar(filtro)
      .then(dados => this.lancamentos = dados);
  }

}