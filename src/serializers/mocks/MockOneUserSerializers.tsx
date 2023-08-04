import { EntitiesOneUser } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
}

export default class MockOneUserSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesOneUser {
    return new EntitiesOneUser({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      perfil: otd.perfil,
      escola: otd.escola,
    });
  }
}
