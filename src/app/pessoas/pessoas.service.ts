import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Pessoa } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class PessoasFiltro {
    nome: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

    pessoasUrl: string;

    constructor(private http: AuthHttp) {

        this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    }

    pesquisar(filtro: PessoasFiltro): Promise<any> {
        const params = new URLSearchParams();

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.pessoasUrl}?resumo`, { search: params })
            .toPromise()
            .then(response => {
                const responseJson = response.json()
                const pessoas = responseJson.content;

                const resultado = {
                    pessoas,
                    total: responseJson.totalElements
                };

                return resultado;
            });
    }

    listarTodas(): Promise<any> {

        return this.http.get(this.pessoasUrl)
            .toPromise()
            .then(response => response.json().content);

    }

    excluir(codigo: number): Promise<void> {
        return this.http.delete(`${this.pessoasUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
    }

    mudarStatus(codigo: number, ativo: boolean): Promise<void> {
        return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
            .toPromise()
            .then(() => null);
    }

    adicionar(pessoa: Pessoa): Promise<any> {
        pessoa.codigo = null;

        return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
            .toPromise()
            .then(response => response.json());
    }

    buscarPorCodigo(codigo: number): Promise<Pessoa> {
        return this.http.get(`${this.pessoasUrl}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {
        const codigo = pessoa.codigo;

        return this.http.put(`${this.pessoasUrl}/${codigo}`, JSON.stringify(pessoa))
            .toPromise()
            .then(response => {
                return response.json();
            })

    }

}