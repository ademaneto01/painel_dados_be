interface UserProps {
  id: string;
  id_ee: string;
  url_dados: string;
  time_stamp: string;
}

export default class EntitiesUrl {
  readonly id: string;
  readonly id_ee: string;
  readonly url_dados: string;
  readonly time_stamp: string;

  constructor({ id, id_ee, url_dados, time_stamp }: UserProps) {
    this.id = id;
    this.id_ee = id_ee;
    this.url_dados = url_dados;
    this.time_stamp = time_stamp;
  }
}
