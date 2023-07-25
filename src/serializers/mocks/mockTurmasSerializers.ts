import { EntitiesTurmas } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface TurmasMockPayload {
  id: string;
  turma: string;
  ano: string;
  professor: string;
  codigo: string;
  languageMaterials: string;
}

export default class MockTurmasSerializers implements SerializerInterface {
  toEntity(otd: TurmasMockPayload): EntitiesTurmas {
    return new EntitiesTurmas({
      id: otd.id,
      turma: otd.turma,
      ano: otd.ano,
      professor: otd.professor,
      codigo: otd.codigo,
      languageMaterials: otd.languageMaterials,
    });
  }
}
