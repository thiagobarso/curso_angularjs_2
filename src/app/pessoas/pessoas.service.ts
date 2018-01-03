import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class PessoasFiltro {
    nome: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

    pessoasUrl = 'http://localhost:8080/pessoas';

    constructor(private http: Http) { }

    pesquisar(filtro: PessoasFiltro): Promise<any> {
        const params = new URLSearchParams();

        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.pessoasUrl}?resumo`, { headers, search: params })
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

    //testandio
    listarTodas(): Promise<any>{
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.pessoasUrl, {headers})
            .toPromise()
            .then(response => response.json().content);

    }

    excluir(codigo: number) : Promise<void>{
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
        return this.http.delete(`${this.pessoasUrl}/${codigo}`,{headers})
        .toPromise()
        .then(() => null);
      }
}