import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lancamentos = [
    {tipo: 'DESPESA', descricao : 'Compra de pão', dataVencimento : '30/06/2017', dataPagamento : null, valor: 4.55, pessoa : 'Padaria do José'},
    {tipo: 'RECEITA', descricao : 'Venda de Software', dataVencimento : '10/06/2017', dataPagamento : '09/06/2017', valor: 80000, pessoa : 'Atacado Brasil'},
    {tipo: 'DESPESA', descricao : 'Impostos', dataVencimento : '20/07/2017', dataPagamento : null, valor: 14312, pessoa : 'Ministério da Fazenda'},
    {tipo: 'DESPESA', descricao : 'Mensalidade da Escola', dataVencimento : '05/06/2017', dataPagamento : '30/05/2017', valor: 800, pessoa : 'Escola Abelha Rainha'}
  ];
}
