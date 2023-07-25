import { EntitiesTeacherGuides } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface TeacherGuidesMockPayload {
  id: string;
  nome: string;
  unidades: string;
  aulas: string;
  ano: string;
  material: string;
}

export default class MockTeacherGuidesSerializers
  implements SerializerInterface
{
  toEntity(otd: TeacherGuidesMockPayload): EntitiesTeacherGuides {
    return new EntitiesTeacherGuides({
      id: otd.id,
      nome: otd.nome,
      unidades: otd.unidades,
      aulas: otd.aulas,
      ano: otd.ano,
      material: otd.material,
    });
  }
}
