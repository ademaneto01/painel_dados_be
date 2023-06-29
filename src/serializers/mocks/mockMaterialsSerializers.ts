import { EntitiesMaterials } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface MaterialsMockPayload {
  id: string;
  nome: string;
  grade: string;
  disciplina: string;
  conteudoDigital: string;
}

export default class MockMaterialsSerializers implements SerializerInterface {
  toEntity(otd: MaterialsMockPayload): EntitiesMaterials {
    return new EntitiesMaterials({
      id: otd.id,
      nome: otd.nome,
      grade: otd.grade,
      disciplina: otd.disciplina,
      conteudoDigital: otd.conteudoDigital,
    });
  }
}
