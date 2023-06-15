import { Escolas} from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface EscolaMockPayload {
  id: string;
  nome: string;
  cidade: string;
  ativo: boolean;
}

export default class MockEscolasSerializers implements SerializerInterface {
  toEntity(otd: EscolaMockPayload): Escolas {
    return new Escolas({
      id: otd.id,
      nome: otd.nome,
      cidade: otd.cidade,
      ativo: otd.ativo,
    });
  }
}
