import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    {label : 'Receita', value : 'RECEITA'},
    {label : 'Despesa', value : 'DESPESA'},
  ];

  categorias = [
    { label: 'Alimentação', value : 1 },
    { label: 'Transporte', value : 2 },
  ];

  pessoas = [
    { label: 'João da Silva', value : 1 },
    { label: 'Sebastião Souza', value : 2 },
    { label: 'Maria Abadia', value : 3 },
  ];

  constructor(
    private categoriasService : CategoriasService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  carregarCategorias(){
    return this.categoriasService.listarTodas()
    .then(categorias => {

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

}
