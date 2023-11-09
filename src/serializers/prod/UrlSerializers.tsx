import { EntitiesUrl } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  id: string;
  id_ee: string;
  url_dados: string;
  time_stamp: string;
}

export default class UrlSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUrl {
    return new EntitiesUrl({
      id: otd.id,
      id_ee: otd.id_ee,
      url_dados: otd.url_dados,
      time_stamp: otd.time_stamp,
    });
  }
}
