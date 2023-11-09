import { EntitiesDocsContrato } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface DocsContratoMockPayload {
  id: string;
  uuid_ec: string;
  nome_doc: string;
  url_doc: string;
}

export default class DocsContratoSerializers implements SerializerInterface {
  toEntity(otd: DocsContratoMockPayload): EntitiesDocsContrato {
    return new EntitiesDocsContrato({
      id: otd.id,
      uuid_ec: otd.uuid_ec,
      nome_doc: otd.nome_doc,
      url_doc: otd.url_doc,
    });
  }
}
