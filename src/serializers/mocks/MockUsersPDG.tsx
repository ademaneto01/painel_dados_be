import { EntitiesUsersPDG } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
}

export default class MockUsersPDG implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUsersPDG {
    return new EntitiesUsersPDG({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      perfil: otd.perfil,
      escola: otd.escola,
    });
  }
}
