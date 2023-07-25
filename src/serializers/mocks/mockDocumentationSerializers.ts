import { EntitiesDocumentation } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface LessonsMockPayload {
  id: string;
  nome: string;
  register: string;
}

export default class MockDocumentationSerializers
  implements SerializerInterface
{
  toEntity(otd: LessonsMockPayload): EntitiesDocumentation {
    return new EntitiesDocumentation({
      id: otd.id,
      nome: otd.nome,
      register: otd.register,
    });
  }
}
