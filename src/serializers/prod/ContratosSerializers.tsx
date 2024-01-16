import { EntitiesContratos } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  nome_simplificado: string;
  razao_social: string;
  cnpj_cont: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  situacao: string;
  complemento: string;
  tipocontrato: string;
  valorcontrato: string;
  ativo: boolean;
  bo_rede: boolean;
  qtdescolas: string;
}

export default class ContratosSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesContratos {
    return new EntitiesContratos({
      id: otd.id,
      nome_simplificado: otd.nome_simplificado,
      razao_social: otd.razao_social,
      cnpj_cont: otd.cnpj_cont,
      cep: otd.cep,
      endereco: otd.endereco,
      cidade: otd.cidade,
      uf: otd.uf,
      bairro: otd.bairro,
      situacao: otd.situacao,
      complemento: otd.complemento,
      tipocontrato: otd.tipocontrato,
      valorcontrato: otd.valorcontrato,
      ativo: otd.ativo,
      bo_rede: otd.bo_rede,
      qtdescolas: otd.qtdescolas,
    });
  }
}
