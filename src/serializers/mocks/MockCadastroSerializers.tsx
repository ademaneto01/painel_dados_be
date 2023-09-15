import { EntitiesCadastroUser } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  id_ee: string;
}

export default class MockCadastroSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesCadastroUser {
    return new EntitiesCadastroUser({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
      perfil: otd.perfil,
      id_ee: otd.id_ee,
    });
  }
}
