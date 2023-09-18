import { TableActionEntidadeEscolar } from '@/components/actions';
import React from 'react';

interface EntidadesEscolaresProps {
  id: string;
  uuid_ec: string;
  id_ec: string;
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  url_dados: string;
  id_usuario_pdg: string;
  complemento: string;
  ativo: boolean;
}

export default class EntitiesEditarEntidadeEscolar {
  readonly id: string;
  readonly uuid_ec: string;
  readonly id_ec: string;
  readonly nome_operacional: string;
  readonly cnpj_escola: string;
  readonly cep: string;
  readonly endereco: string;
  readonly cidade: string;
  readonly uf: string;
  readonly bairro: string;
  readonly url_dados: string;
  readonly id_usuario_pdg: string;
  readonly complemento: string;
  readonly ativo: boolean;

  constructor({
    id,
    uuid_ec,
    id_ec,
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    url_dados,
    id_usuario_pdg,
    complemento,
    ativo,
  }: EntidadesEscolaresProps) {
    this.id = id;
    this.uuid_ec = uuid_ec;
    this.id_ec = id_ec;
    this.nome_operacional = nome_operacional;
    this.cnpj_escola = cnpj_escola;
    this.cep = cep;
    this.endereco = endereco;
    this.cidade = cidade;
    this.uf = uf;
    this.bairro = bairro;
    this.url_dados = url_dados;
    this.id_usuario_pdg = id_usuario_pdg;
    this.complemento = complemento;
    this.ativo = ativo;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionEntidadeEscolar id={this.id} nome={this.nome_operacional} />
    );
  }
}
