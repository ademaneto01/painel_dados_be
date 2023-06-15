import { TableActions } from "@/components/actions";
import OnOffToggler from "@/components/shared/onOffToogler";

interface CarteiraProps {
  id: string;
  nome: string;
  cidade: string;
  ativo: boolean
}

export default class Escolas {
  readonly id: string;
  readonly nome: string;
  readonly cidade: string;
  readonly actived: boolean;
  private readonly _ativo: boolean;

  constructor({
    id,
    nome,
    cidade,
    ativo,
  }: CarteiraProps) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this._ativo = ativo;
  }

  public get acoes(): JSX.Element {
    return <TableActions id={this.id} />;
  }

  public get ativo(): JSX.Element {
    return <OnOffToggler  active={this._ativo} />;
  }
}
