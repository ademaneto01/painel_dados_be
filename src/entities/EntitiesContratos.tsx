import { TableActionsContratos } from '@/components/actions';

interface ContractProps {
  id: string;
  nome_simplificado: string;
  razao_social: string;
  cnpj_cont: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  situacao: string;
  complemento: string;
  ativo: boolean;
  bo_rede: boolean;
  qtdescolas: string;
}

export default class EntitiesContratos {
  readonly id: string;
  readonly nome_simplificado: string;
  readonly razao_social: string;
  readonly cnpj_cont: string;
  readonly cep: string;
  readonly endereco: string;
  readonly cidade: string;
  readonly uf: string;
  readonly bairro: string;
  readonly situacao: string;
  readonly complemento: string;
  readonly ativo: boolean;
  readonly bo_rede: boolean;
  readonly qtdescolas: string;

  constructor({
    id,
    nome_simplificado,
    razao_social,
    cnpj_cont,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    situacao,
    complemento,
    ativo,
    bo_rede,
    qtdescolas,
  }: ContractProps) {
    this.id = id;
    this.nome_simplificado = nome_simplificado;
    this.razao_social = razao_social;
    this.cnpj_cont = cnpj_cont;
    this.cep = cep;
    this.endereco = endereco;
    this.cidade = cidade;
    this.uf = uf;
    this.bairro = bairro;
    this.situacao = situacao;
    this.complemento = complemento;
    this.ativo = ativo;
    this.bo_rede = bo_rede;
    this.qtdescolas = qtdescolas;
  }
  public get acoes(): JSX.Element {
    return <TableActionsContratos id={this.id} nome={this.nome_simplificado} />;
  }
}
