import { TableActionsUsers } from '@/components/actions';
import { OnOffToggler } from '@/components/shared';
import React from 'react';
interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
  id_ee: string;
  ativo: boolean;
}

export default class EntitiesUsers {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly escola: string;
  readonly id_ee: string;
  private readonly _ativo: boolean;

  constructor({ id, nome, email, perfil, escola, id_ee, ativo }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.escola = escola;
    this.id_ee = id_ee;
    this._ativo = ativo;
  }
  public get acoes(): JSX.Element {
    return <TableActionsUsers id={this.id} nome={this.nome} />;
  }

  public get ativo(): JSX.Element {
    return <OnOffToggler active={this._ativo} userId={this.id} />;
  }
}
