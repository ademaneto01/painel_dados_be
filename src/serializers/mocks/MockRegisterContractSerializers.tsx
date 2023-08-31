import { EntitiesRegisterContract } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome_simplificado: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  qtdescolas: string;
}

export default class MockRegisterContractSerializers
  implements SerializerInterface
{
  toEntity(otd: UsersMockPayload): EntitiesRegisterContract {
    return new EntitiesRegisterContract({
      id: otd.id,
      nome_simplificado: otd.nome_simplificado,
      razao_social: otd.razao_social,
      cnpj: otd.cnpj,
      cep: otd.cep,
      endereco: otd.endereco,
      cidade: otd.cidade,
      uf: otd.uf,
      bairro: otd.bairro,
      complemento: otd.complemento,
      qtdescolas: otd.qtdescolas,
    });
  }
}
