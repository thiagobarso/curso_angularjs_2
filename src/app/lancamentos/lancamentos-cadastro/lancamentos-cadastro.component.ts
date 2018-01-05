import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoasService } from './../../pessoas/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { LancamentosService } from '../lancamentos.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private lancamentoService: LancamentosService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.toasty.success('Lançamento adicionado com sucesso');
      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriasService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo }
        });
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo }
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
