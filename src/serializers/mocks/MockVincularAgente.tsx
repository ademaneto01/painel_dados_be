import { EntitiesVincularAgente } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface VincularAgenteMockPayload {
  id: string;
  id_prof: string;
  id_escola: string;
  especialista: boolean;
  readonly bo_3EI: boolean;
  readonly bo_4EI: boolean;
  readonly bo_5EI: boolean;
  readonly bo_1AI: boolean;
  readonly bo_2AI: boolean;
  readonly bo_3AI: boolean;
  readonly bo_4AI: boolean;
  readonly bo_5AI: boolean;
  readonly bo_6Af: boolean;
  readonly bo_7AF: boolean;
  readonly bo_8AF: boolean;
  readonly bo_9AF: boolean;
}

export default class MockVincularAgente implements SerializerInterface {
  toEntity(otd: VincularAgenteMockPayload): EntitiesVincularAgente {
    return new EntitiesVincularAgente({
      id: otd.id,
      id_prof: otd.id_prof,
      id_escola: otd.id_escola,
      especialista: otd.especialista,
      bo_3EI: otd.bo_3EI,
      bo_4EI: otd.bo_4EI,
      bo_5EI: otd.bo_5EI,
      bo_1AI: otd.bo_1AI,
      bo_2AI: otd.bo_2AI,
      bo_3AI: otd.bo_3AI,
      bo_4AI: otd.bo_4AI,
      bo_5AI: otd.bo_5AI,
      bo_6Af: otd.bo_6Af,
      bo_7AF: otd.bo_7AF,
      bo_8AF: otd.bo_8AF,
      bo_9AF: otd.bo_9AF,
    });
  }
}
