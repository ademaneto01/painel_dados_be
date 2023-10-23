import { TableActionsTeste } from '@/components/actions';
import React from 'react';
interface UserProps {
  uuid_agente: string;
  nome: string;
  cargo: string;
  bo_ativo: boolean;
  nu_telefone: string;
  data_nascimento: string;
  no_email_primario: string;
  no_email_secundario: string;
}

export default class EntitiesTeste {
  readonly uuid_agente: string;
  readonly nome: string;
  readonly cargo: string;
  readonly bo_ativo: boolean;
  readonly nu_telefone: string;
  readonly data_nascimento: string;
  readonly no_email_primario: string;
  readonly no_email_secundario: string;

  constructor({
    uuid_agente,
    nome,
    cargo,
    bo_ativo,
    nu_telefone,
    data_nascimento,
    no_email_primario,
    no_email_secundario,
  }: UserProps) {
    this.uuid_agente = uuid_agente;
    this.nome = nome;
    this.cargo = cargo;
    this.bo_ativo = bo_ativo;
    this.nu_telefone = nu_telefone;
    this.data_nascimento = data_nascimento;
    this.no_email_primario = no_email_primario;
    this.no_email_secundario = no_email_secundario;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionsTeste uuid_agente={this.uuid_agente} nome={this.nome} />
    );
  }
}
