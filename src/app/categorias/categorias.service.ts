import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriasService {

    categoriasUrl = 'http://localhost:8080/categorias';

    constructor(private http : Http){

    }

    listaTodas(): Promise<any>{

    }

}