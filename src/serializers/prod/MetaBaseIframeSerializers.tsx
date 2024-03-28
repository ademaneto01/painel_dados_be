import { EntitiesMetaBaseIframe } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface MetaBasePayload {
  iframeUrl: string;
}

export default class MetaBaseIframeSerializers implements SerializerInterface {
  toEntity(otd: MetaBasePayload): EntitiesMetaBaseIframe {
    return new EntitiesMetaBaseIframe({
      iframeUrl: otd.iframeUrl,
    });
  }
}
