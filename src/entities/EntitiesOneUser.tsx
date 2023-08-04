interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
  url_dados: string;
}

export default class EntitiesOneUser {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly escola: string;
  readonly url_dados: string;

  constructor({ id, nome, email, perfil, escola, url_dados }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.escola = escola;
    this.url_dados = url_dados;
  }
}
