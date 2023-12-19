import { EntitiesAlunados } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AlunadosPayload {
  id: string;
  id_ee: string;
  ano_ref: string;
  '3EI': string;
  '4EI': string;
  '5EI': string;
  '1EF': string;
  '2EF': string;
  '3EF': string;
  '4EF': string;
  '5EF': string;
  '6EF': string;
  '7EF': string;
  '8EF': string;
  '9EF': string;
  '1EM': string;
  '2EM': string;
  '3EM': string;
}

export default class AlunadosSerializers implements SerializerInterface {
  toEntity(otd: AlunadosPayload): EntitiesAlunados {
    return new EntitiesAlunados({
      id: otd.id,
      id_ee: otd.id_ee,
      ano_ref: otd.ano_ref,
      '3EI': otd['3EI'],
      '4EI': otd['4EI'],
      '5EI': otd['5EI'],
      '1EF': otd['1EF'],
      '2EF': otd['2EF'],
      '3EF': otd['3EF'],
      '4EF': otd['4EF'],
      '5EF': otd['5EF'],
      '6EF': otd['6EF'],
      '7EF': otd['7EF'],
      '8EF': otd['8EF'],
      '9EF': otd['9EF'],
      '1EM': otd['1EM'],
      '2EM': otd['2EM'],
      '3EM': otd['3EM'],
    });
  }
}
