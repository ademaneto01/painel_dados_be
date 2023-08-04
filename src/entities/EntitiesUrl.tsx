interface UserProps {
  id: string;
  url_dados: string;
  time_stamp: string;
  id_usuario: string;
}

export default class EntitiesUrl {
  readonly id: string;
  readonly url_dados: string;
  readonly time_stamp: string;
  readonly id_usuario: string;

  constructor({ id, url_dados, time_stamp, id_usuario }: UserProps) {
    this.id = id;
    this.url_dados = url_dados;
    this.time_stamp = time_stamp;
    this.id_usuario = id_usuario;
  }
}
