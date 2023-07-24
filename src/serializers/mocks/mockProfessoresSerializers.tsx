import { EntitiesAlunos, EntitiesProfessores } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface ProfessoresMockPayload {
  id: string;
  professor: string;
  turma: string;
}

export default class MockProfessoresSerializers implements SerializerInterface {
  toEntity(otd: ProfessoresMockPayload): EntitiesProfessores {
    return new EntitiesProfessores({
      id: otd.id,
      professor: otd.professor,
      turma: otd.turma,
    });
  }
}
