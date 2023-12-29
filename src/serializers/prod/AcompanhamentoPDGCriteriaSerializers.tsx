import { EntitiesAcompanhamentoPDGCriteria } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AcompanhamentoPDGPayload {
  id: string;
  id_acmp: string;
  e1: string;
  e2: string;
  e3: string;
  e4: string;
  e5: string;
  e6: string;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  l6: string;
  finalized: boolean;
  finalizedtimestamp: string;
  deleted: boolean;
}

export default class AcompanhamentoPDGCriteriaSerializers
  implements SerializerInterface
{
  toEntity(otd: AcompanhamentoPDGPayload): EntitiesAcompanhamentoPDGCriteria {
    return new EntitiesAcompanhamentoPDGCriteria({
      id: otd.id,
      id_acmp: otd.id_acmp,
      e1: otd.e1,
      e2: otd.e2,
      e3: otd.e3,
      e4: otd.e4,
      e5: otd.e5,
      e6: otd.e6,
      m1: otd.m1,
      m2: otd.m2,
      m3: otd.m3,
      m4: otd.m4,
      m5: otd.m5,
      m6: otd.m6,
      l1: otd.l1,
      l2: otd.l2,
      l3: otd.l3,
      l4: otd.l4,
      l5: otd.l5,
      l6: otd.l6,
      finalized: otd.finalized,
      finalizedtimestamp: otd.finalizedtimestamp,
      deleted: otd.deleted,
    });
  }
}
