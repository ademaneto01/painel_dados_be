import { TableActionsDocsEntidade } from '@/components/actions';
import React from 'react';
interface UserProps {
  id: string;
  uuid_ee: string;
  nome_doc: string;
  url_doc: string;
}

export default class EntitiesDocsEntidade {
  readonly id: string;
  readonly uuid_ee: string;
  readonly nome_doc: string;
  readonly url_doc: string;

  constructor({ id, uuid_ee, nome_doc, url_doc }: UserProps) {
    this.id = id;
    this.uuid_ee = uuid_ee;
    this.nome_doc = nome_doc;
    this.url_doc = url_doc;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionsDocsEntidade
        id={this.id}
        url_doc={this.url_doc}
        nome={this.nome_doc}
      />
    );
  }
}
