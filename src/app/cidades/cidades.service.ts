import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Cidade } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class CidadeFiltro {
  nome: string;
  uf: string;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable()
export class CidadesService {

  cidadesUrl: string;

  constructor(private http: AuthHttp) {
    this.cidadesUrl = `${environment.apiUrl}/cidade`;
  }

  pesquisar(filtro: CidadeFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.cidadesUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json()
        const cidades = responseJson.content;

        const resultado = {
          cidades,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    console.log('Excluindo..');
    return this.http.delete(`${this.cidadesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(cidade: Cidade): Promise<Cidade> {
    return this.http.post(this.cidadesUrl, JSON.stringify(cidade))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(cidade: Cidade): Promise<Cidade> {
    const codigo = cidade.id;

    return this.http.put(`${this.cidadesUrl}/${codigo}`, JSON.stringify(cidade))
      .toPromise()
      .then(response => {
        console.log('ATUALIZAR:')
        console.log(response.json().content);
        let cidades: Cidade[] = [];
        cidades.push(response.json());        
        return cidades[0];
      });
  }

  buscarPorCodigo(codigo: number): Promise<Cidade> {
    return this.http.get(`${this.cidadesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        console.log('BUSCAR POR CODIGO:');
        console.log(response.json());
        let cidades: Cidade[] = [];
        cidades.push(response.json());        
        return cidades[0];
      });
  }  

}
