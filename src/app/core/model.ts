export class Pessoa{
    codigo: number = 1;
}

export class Categoria{
    codigo: number = 1;
}

export class Lancamento {
    codigo: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}