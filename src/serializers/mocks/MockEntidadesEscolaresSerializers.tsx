import { EntitiesEntidadesEscolares } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  condicao: string;
  codigo_be: string;
  nome_contratual: string;
  tipo_rede: string;
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  id_contrato: string;
}

export default class MockEntidadesEscolaresSerializers
  implements SerializerInterface
{
  toEntity(otd: UsersMockPayload): EntitiesEntidadesEscolares {
    return new EntitiesEntidadesEscolares({
      id: otd.id,
      condicao: otd.condicao,
      codigo_be: otd.codigo_be,
      nome_contratual: otd.nome_contratual,
      tipo_rede: otd.tipo_rede,
      nome_operacional: otd.nome_operacional,
      cnpj_escola: otd.cnpj_escola,
      cep: otd.cep,
      endereco: otd.endereco,
      cidade: otd.cidade,
      uf: otd.uf,
      bairro: otd.bairro,
      complemento: otd.complemento,
      id_contrato: otd.id_contrato,
    });
  }
}
