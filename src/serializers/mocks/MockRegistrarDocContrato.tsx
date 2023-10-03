import { EntitiesRegistrarDocContrato } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface RegistrarMockPayload {
  id: string;
  uuid_ec: string;
  nome_doc: string;
  url_doc: string;
  criado_em: string;
}

export default class MockRegistrarDocContrato implements SerializerInterface {
  toEntity(otd: RegistrarMockPayload): EntitiesRegistrarDocContrato {
    return new EntitiesRegistrarDocContrato({
      id: otd.id,
      uuid_ec: otd.uuid_ec,
      nome_doc: otd.nome_doc,
      url_doc: otd.url_doc,
      criado_em: otd.criado_em,
    });
  }
}
