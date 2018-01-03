import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any){
    let msg: string;

    if (typeof errorResponse == 'string'){
      msg = errorResponse;
    }else{
      let corpoDoErro = JSON.parse(errorResponse._body);
      msg = corpoDoErro[0].mensagemUsuario;
      console.log('Ocorreu um erro.', corpoDoErro[0].mensagemUsuario);
    }

    this.toasty.error(msg);

  }

}
