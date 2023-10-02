import { EntitiesAgenteExternoVinculo } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AgenteExternoMockPayload {
  uuid_agente: string;
  nome: string;
  cargo: string;
  bo_ativo: boolean;
  nu_telefone: number;
  no_email_primario: string;
  no_email_secundario: string;
}

export default class MockAgenteExternoVinculo implements SerializerInterface {
  toEntity(otd: AgenteExternoMockPayload): EntitiesAgenteExternoVinculo {
    return new EntitiesAgenteExternoVinculo({
      uuid_agente: otd.uuid_agente,
      nome: otd.nome,
      cargo: otd.cargo,
      bo_ativo: otd.bo_ativo,
      nu_telefone: otd.nu_telefone,
      no_email_primario: otd.no_email_primario,
      no_email_secundario: otd.no_email_secundario,
    });
  }
}
