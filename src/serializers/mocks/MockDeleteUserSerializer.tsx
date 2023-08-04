import { EntitiesDeletUser } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
}

export default class MockDeleteUserSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesDeletUser {
    return new EntitiesDeletUser({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      perfil: otd.perfil,
      escola: otd.escola,
    });
  }
}
