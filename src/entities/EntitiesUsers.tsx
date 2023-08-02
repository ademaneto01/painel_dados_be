import { TableActionsUsers } from '@/components/actions';

interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

export default class EntitiesUsers {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;

  constructor({ id, nome, email, perfil }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
  }
  public get acoes(): JSX.Element {
    return <TableActionsUsers id={this.id} nome={this.nome} />;
  }
}
