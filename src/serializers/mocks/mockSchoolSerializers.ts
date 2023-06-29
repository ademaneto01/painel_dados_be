import { EntitiesSchool } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface SchoolMockPayload {
  id: string;
  nome: string;
  cidade: string;
  nomeContato: string;
  sso: string;
  estado: string;
  cep: string;
  telefone: string;
  ativo: boolean;
}

export default class MockSchoolSerializers implements SerializerInterface {
  toEntity(otd: SchoolMockPayload): EntitiesSchool {
    return new EntitiesSchool({
      id: otd.id,
      nome: otd.nome,
      cidade: otd.cidade,
      nomeContato: otd.nomeContato,
      sso: otd.sso,
      estado: otd.estado,
      cep: otd.cep,
      telefone: otd.telefone,
      ativo: otd.ativo,
    });
  }
}
