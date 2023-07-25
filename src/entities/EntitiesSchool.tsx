import { TableActionsSchool } from '@/components/actions';
import OnOffToggler from '@/components/shared/onOffToogler';

interface CarteiraProps {
  id: string;
  nome: string;
  cidade: string;
  nomeContato: string;
  sso: string;
  estado: string;
  cep: string;
  telefone: string;
  ativo: boolean;
}

export default class EntitiesSchool {
  readonly id: string;
  readonly nome: string;
  readonly cidade: string;
  readonly nomeContato: string;
  readonly sso: string;
  readonly estado: string;
  readonly cep: string;
  readonly telefone: string;
  private readonly _ativo: boolean;

  constructor({
    id,
    nome,
    cidade,
    nomeContato,
    sso,
    estado,
    cep,
    telefone,
    ativo,
  }: CarteiraProps) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    (this.nomeContato = nomeContato),
      (this.sso = sso),
      (this.estado = estado),
      (this.cep = cep),
      (this.telefone = telefone),
      (this._ativo = ativo);
  }

  public get acoes(): JSX.Element {
    return <TableActionsSchool id={this.id} titleDelete={this.nome} />;
  }

  public get ativo(): JSX.Element {
    return <OnOffToggler active={this._ativo} />;
  }
}
