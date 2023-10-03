interface UserProps {
  id: string;
  uuid_ec: string;
  nome_doc: string;
  url_doc: string;
  criado_em: string;
}

export default class EntitiesRegistrarDocContrato {
  readonly id: string;
  readonly uuid_ec: string;
  readonly nome_doc: string;
  readonly url_doc: string;
  readonly criado_em: string;

  constructor({ id, uuid_ec, nome_doc, url_doc, criado_em }: UserProps) {
    this.id = id;
    this.uuid_ec = uuid_ec;
    this.nome_doc = nome_doc;
    this.url_doc = url_doc;
    this.criado_em = criado_em;
  }
}
