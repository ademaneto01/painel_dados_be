interface UserProps {
  id: string;
  nome: string;
  email: string;
  token: string;
  perfil: string;
  escola: string;
}

export default class EntitiesUserLogin {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly token: string;
  readonly perfil: string;
  readonly escola: string;

  constructor({ id, nome, email, token, perfil, escola }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.token = token;
    this.perfil = perfil;
    this.escola = escola;
  }
}
