interface ContractProps {
  id: string;
  nome_simplificado: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  qtdescolas: string;
}

export default class EntitiesRegisterContract {
  readonly id: string;
  readonly nome_simplificado: string;
  readonly razao_social: string;
  readonly cnpj: string;
  readonly cep: string;
  readonly endereco: string;
  readonly cidade: string;
  readonly uf: string;
  readonly bairro: string;
  readonly complemento: string;
  readonly qtdescolas: string;

  constructor({
    id,
    nome_simplificado,
    razao_social,
    cnpj,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    qtdescolas,
  }: ContractProps) {
    this.id = id;
    this.nome_simplificado = nome_simplificado;
    this.razao_social = razao_social;
    this.cnpj = cnpj;
    this.cep = cep;
    this.endereco = endereco;
    this.cidade = cidade;
    this.uf = uf;
    this.bairro = bairro;
    this.complemento = complemento;
    this.qtdescolas = qtdescolas;
  }
}
