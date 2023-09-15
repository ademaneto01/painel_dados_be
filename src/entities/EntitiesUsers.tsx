import { TableActionsUsers } from '@/components/actions';
import React from 'react';
interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
  id_ee: string;
}

export default class EntitiesUsers {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly escola: string;
  readonly id_ee: string;

  constructor({ id, nome, email, perfil, escola, id_ee }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.escola = escola;
    this.id_ee = id_ee;
  }
  public get acoes(): JSX.Element {
    return <TableActionsUsers id={this.id} nome={this.nome} />;
  }
}
