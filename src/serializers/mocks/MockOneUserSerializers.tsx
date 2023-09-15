import { EntitiesOneUser } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  id_ee: string;
}

export default class MockOneUserSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesOneUser {
    return new EntitiesOneUser({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      senha: otd.senha,
      perfil: otd.perfil,
      id_ee: otd.id_ee,
    });
  }
}
