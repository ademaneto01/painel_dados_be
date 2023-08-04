import { EntitiesUrl } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  url_dados: string;
  time_stamp: string;
  id_usuario: string;
}

export default class MockUrlSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUrl {
    return new EntitiesUrl({
      id: otd.id,
      url_dados: otd.url_dados,
      time_stamp: otd.time_stamp,
      id_usuario: otd.id_usuario,
    });
  }
}
