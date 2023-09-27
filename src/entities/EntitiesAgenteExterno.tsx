import { TableActionAgentesRelacionadoEscola } from '@/components/actions';
import React from 'react';
interface UserProps {
  id: string;
  nome: string;
  ativo: boolean;
  email_primario: string;
  email_secundario: string;
}

export default class EntitiesAgenteExterno {
  readonly id: string;
  readonly nome: string;
  readonly ativo: boolean;
  readonly email_primario: string;
  readonly email_secundario: string;

  constructor({
    id,
    nome,
    ativo,
    email_primario,
    email_secundario,
  }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.email_primario = email_primario;
    this.email_secundario = email_secundario;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionAgentesRelacionadoEscola id={this.id} nome={this.nome} />
    );
  }
}
