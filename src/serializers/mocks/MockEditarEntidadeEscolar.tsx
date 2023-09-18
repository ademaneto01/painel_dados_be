import { EntitiesEditarEntidadeEscolar } from '@/entities';
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
  url_dados: string;
  id_usuario_pdg: string;
  complemento: string;

  ativo: boolean;
}

export default class MockEditarEntidadeEscolar implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesEditarEntidadeEscolar {
    return new EntitiesEditarEntidadeEscolar({
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
      url_dados: otd.url_dados,
      id_usuario_pdg: otd.id_usuario_pdg,
      complemento: otd.complemento,
      ativo: otd.ativo,
    });
  }
}
