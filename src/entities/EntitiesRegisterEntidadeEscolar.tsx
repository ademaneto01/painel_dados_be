interface EntidadesEscolaresProps {
  id: string;
  condicao: string;
  codigo_be: string;
  nome_contratual: string;
  tipo_rede: string;
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  situacao: string;
  id_contrato: string;
}

export default class EntitiesRegisterEntidadeEscolar {
  readonly id: string;
  readonly condicao: string;
  readonly codigo_be: string;
  readonly nome_contratual: string;
  readonly tipo_rede: string;
  readonly nome_operacional: string;
  readonly cnpj_escola: string;
  readonly cep: string;
  readonly endereco: string;
  readonly cidade: string;
  readonly uf: string;
  readonly bairro: string;
  readonly complemento: string;
  readonly situacao: string;
  readonly id_contrato: string;

  constructor({
    id,
    condicao,
    codigo_be,
    nome_contratual,
    tipo_rede,
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    situacao,
    id_contrato,
  }: EntidadesEscolaresProps) {
    this.id = id;
    this.condicao = condicao;
    this.codigo_be = codigo_be;
    this.nome_contratual = nome_contratual;
    this.tipo_rede = tipo_rede;
    this.nome_operacional = nome_operacional;
    this.cnpj_escola = cnpj_escola;
    this.cep = cep;
    this.endereco = endereco;
    this.cidade = cidade;
    this.uf = uf;
    this.bairro = bairro;
    this.complemento = complemento;
    this.situacao = situacao;
    this.id_contrato = id_contrato;
  }
}
