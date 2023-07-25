import { EntitiesUnits } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UnitsMockPayload {
  id: string;
  nome: string;
  planos: string;
  doc: string;
}

export default class MockUnitsSerializers implements SerializerInterface {
  toEntity(otd: UnitsMockPayload): EntitiesUnits {
    return new EntitiesUnits({
      id: otd.id,
      nome: otd.nome,
      planos: otd.planos,
      doc: otd.doc,
    });
  }
}
