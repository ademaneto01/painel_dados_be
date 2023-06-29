import { TableActions } from '@/components/actions';
import OnOffToggler from '@/components/shared/onOffToogler';

interface UserProps {
  id: string;
  nome: string;
  email: string;
  escola: string;
  perfil: string;
  ativo: boolean;
}

export default class EntitiesUsers {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly escola: string;
  readonly perfil: string;
  private readonly _ativo: boolean;

  constructor({ id, nome, email, escola, perfil, ativo }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    (this.escola = escola), (this.perfil = perfil), (this._ativo = ativo);
  }

  // public get acoes(): JSX.Element {
  //   return <TableActions id={this.id} nameSchool={this.nome} modalKey={this.id}/>;
  // }

  public get ativo(): JSX.Element {
    return <OnOffToggler active={this._ativo} />;
  }
}
