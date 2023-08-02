import { EntitiesUserLogin } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  token: string;
  perfil: string;
}

export default class MockUserLogin implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUserLogin {
    return new EntitiesUserLogin({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      token: otd.token,
      perfil: otd.perfil,
    });
  }
}
