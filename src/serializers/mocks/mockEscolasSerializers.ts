import { Escolas} from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface EscolaMockPayload {
  id: string;
  nome: string;
  cidade: string;
  nomeContato: string,
  sso: string,
  estado: string,
  cep : string,
  telefone: string,
  ativo: boolean;
}

export default class MockEscolasSerializers implements SerializerInterface {
  toEntity(otd: EscolaMockPayload): Escolas {
    return new Escolas({
      id: otd.id,
      nome: otd.nome,
      cidade: otd.cidade,
      nomeContato: otd.nomeContato,
      sso: otd.sso,
      estado: otd.estado,
      cep : otd.cep,
      telefone: otd.telefone,
      ativo: otd.ativo,
    });
  }
}
