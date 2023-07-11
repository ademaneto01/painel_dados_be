import { EntitiesClassPlan } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface ClassPlanMockPayload {
  id: string;
  nome: string;
  planos: string;
}

export default class MockClassPanSerializers implements SerializerInterface {
  toEntity(otd: ClassPlanMockPayload): EntitiesClassPlan {
    return new EntitiesClassPlan({
      id: otd.id,
      nome: otd.nome,
      planos: otd.planos,
    });
  }
}
