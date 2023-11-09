import { EntitiesRegistrarEntidadeEscolar } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  uuid_ec: string;
  id_ec: string;
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  ativo: boolean;
}

export default class RegisterEntitiesEscolaresSerializers
  implements SerializerInterface
{
  toEntity(otd: UsersMockPayload): EntitiesRegistrarEntidadeEscolar {
    return new EntitiesRegistrarEntidadeEscolar({
      id: otd.id,
      uuid_ec: otd.uuid_ec,
      id_ec: otd.id_ec,
      nome_operacional: otd.nome_operacional,
      cnpj_escola: otd.cnpj_escola,
      cep: otd.cep,
      endereco: otd.endereco,
      cidade: otd.cidade,
      uf: otd.uf,
      bairro: otd.bairro,
      complemento: otd.complemento,
      ativo: otd.ativo,
    });
  }
}
