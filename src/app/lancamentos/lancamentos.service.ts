import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable()
export class LancamentosService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json()
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const codigo = lancamento.codigo;

    return this.http.put(`${this.lancamentosUrl}/${codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        console.log('ATUALIZAR:')
        console.log(response.json().content);
        let lancamentos: Lancamento[] = [];
        lancamentos.push(response.json());
        let lancamentosTransformados = this.converterStringParaDatas(lancamentos);
        return lancamentosTransformados[0];
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        console.log('BUSCAR POR CODIGO:');
        console.log(response.json());
        let lancamentos: Lancamento[] = [];
        lancamentos.push(response.json());
        let lancamentosTransformados = this.converterStringParaDatas(lancamentos);
        console.log(lancamentosTransformados[0]);
        return lancamentosTransformados[0];
      });
  }


  private converterStringParaDatas(lancamentos: Lancamento[]): Lancamento[] {
    for (let l of lancamentos) {
      if (l.dataVencimento != null) {
        const dataVencimentoTipoDate = moment(l.dataVencimento, 'YYYY/MM/DD').toDate();
        l.dataVencimento = dataVencimentoTipoDate;
      }
      if (l.dataPagamento != null) {
        const dataPagamentoTipoDate = moment(l.dataPagamento, 'YYYY/MM/DD').toDate();
        l.dataPagamento = dataPagamentoTipoDate;
      }
    }
    return lancamentos;
  }

}
