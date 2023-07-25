import { EntitiesLessons } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface LessonsMockPayload {
  id: string;
  nome: string;
  descricao: string;
  arquivo: string;
  ano: string;
}

export default class MockLessonsSerializers implements SerializerInterface {
  toEntity(otd: LessonsMockPayload): EntitiesLessons {
    return new EntitiesLessons({
      id: otd.id,
      nome: otd.nome,
      descricao: otd.descricao,
      arquivo: otd.arquivo,
      ano: otd.ano,
    });
  }
}
