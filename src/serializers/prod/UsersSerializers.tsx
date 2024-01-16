import { EntitiesUsers } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
  id_ee: string;
  ativo: boolean;
}

export default class UsersSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUsers {
    return new EntitiesUsers({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      perfil: otd.perfil,
      escola: otd.escola,
      id_ee: otd.id_ee,
      ativo: otd.ativo,
    });
  }
}
