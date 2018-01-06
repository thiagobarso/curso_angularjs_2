import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoasService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }
  
  ngOnInit() {
  }

  salvar(form: FormControl){
    console.log(this.pessoa);
    this.pessoasService.adicionar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa adicionada com sucesso');
      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.pessoa = new Pessoa();
  }

}
