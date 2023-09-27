import { EntitiesAgenteExterno } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AgenteExternoMockPayload {
  id: string;
  nome: string;
  ativo: boolean;
  email_primario: string;
  email_secundario: string;
}

export default class MockAgenteExterno implements SerializerInterface {
  toEntity(otd: AgenteExternoMockPayload): EntitiesAgenteExterno {
    return new EntitiesAgenteExterno({
      id: otd.id,
      nome: otd.nome,
      ativo: otd.ativo,
      email_primario: otd.email_primario,
      email_secundario: otd.email_secundario,
    });
  }
}
