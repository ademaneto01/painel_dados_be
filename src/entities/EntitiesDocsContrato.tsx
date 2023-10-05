import { TableActionsDocsContrato } from '@/components/actions';
import React from 'react';
interface UserProps {
  id: string;
  uuid_ec: string;
  nome_doc: string;
  url_doc: string;
}

export default class EntitiesDocsContrato {
  readonly id: string;
  readonly uuid_ec: string;
  readonly nome_doc: string;
  readonly url_doc: string;

  constructor({ id, uuid_ec, nome_doc, url_doc }: UserProps) {
    this.id = id;
    this.uuid_ec = uuid_ec;
    this.nome_doc = nome_doc;
    this.url_doc = url_doc;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionsDocsContrato
        id={this.id}
        url_doc={this.url_doc}
        nome={this.nome_doc}
      />
    );
  }
}
