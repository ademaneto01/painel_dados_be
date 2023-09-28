import { EntitiesVincularAgente } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface VincularAgenteMockPayload {
  id: string;
  id_prof: string;
  id_escola: string;
  especialista: boolean;
  bo_3ei: boolean;
  bo_4ei: boolean;
  bo_5ei: boolean;
  bo_1ai: boolean;
  bo_2ai: boolean;
  bo_3ai: boolean;
  bo_4ai: boolean;
  bo_5ai: boolean;
  bo_6af: boolean;
  bo_7af: boolean;
  bo_8af: boolean;
  bo_9af: boolean;
}

export default class MockVincularAgente implements SerializerInterface {
  toEntity(otd: VincularAgenteMockPayload): EntitiesVincularAgente {
    return new EntitiesVincularAgente({
      id: otd.id,
      id_prof: otd.id_prof,
      id_escola: otd.id_escola,
      especialista: otd.especialista,
      bo_3ei: otd.bo_3ei,
      bo_4ei: otd.bo_4ei,
      bo_5ei: otd.bo_5ei,
      bo_1ai: otd.bo_1ai,
      bo_2ai: otd.bo_2ai,
      bo_3ai: otd.bo_3ai,
      bo_4ai: otd.bo_4ai,
      bo_5ai: otd.bo_5ai,
      bo_6af: otd.bo_6af,
      bo_7af: otd.bo_7af,
      bo_8af: otd.bo_8af,
      bo_9af: otd.bo_9af,
    });
  }
}
