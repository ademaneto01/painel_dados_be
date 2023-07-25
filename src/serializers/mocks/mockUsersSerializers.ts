import { EntitiesUsers } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  escola: string;
  perfil: string;
  ativo: boolean;
}

export default class MockUsersSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUsers {
    return new EntitiesUsers({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      escola: otd.escola,
      perfil: otd.perfil,
      ativo: otd.ativo,
    });
  }
}
