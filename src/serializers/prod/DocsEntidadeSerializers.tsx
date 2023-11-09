import { EntitiesDocsEntidade } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface DocsContratoMockPayload {
  id: string;
  uuid_ee: string;
  nome_doc: string;
  url_doc: string;
}

export default class DocsEntitadeSerializers implements SerializerInterface {
  toEntity(otd: DocsContratoMockPayload): EntitiesDocsEntidade {
    return new EntitiesDocsEntidade({
      id: otd.id,
      uuid_ee: otd.uuid_ee,
      nome_doc: otd.nome_doc,
      url_doc: otd.url_doc,
    });
  }
}
