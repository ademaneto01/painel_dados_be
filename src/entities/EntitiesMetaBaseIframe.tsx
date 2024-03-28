interface MetaProps {
  iframeUrl: string;
}

export default class EntitiesMetaBaseIframe {
  readonly iframeUrl: string;

  constructor({ iframeUrl }: MetaProps) {
    this.iframeUrl = iframeUrl;
  }
}
