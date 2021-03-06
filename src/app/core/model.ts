export class Cidade{
    id: number;
    nome: string;
    uf: string;
}

export class Login{
    usuario: string;
    senha: string;
}

export class Endereco{
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
}

export class Pessoa{
    codigo: number;
    nome: string;
    endereco = new Endereco();
    ativo: boolean;
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