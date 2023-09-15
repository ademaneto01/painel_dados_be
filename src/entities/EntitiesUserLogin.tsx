interface UserProps {
  id: string;
  nome: string;
  email: string;
  token: string;
  perfil: string;
  id_ee: string;
}

export default class EntitiesUserLogin {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly token: string;
  readonly perfil: string;
  readonly id_ee: string;

  constructor({ id, nome, email, token, perfil, id_ee }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.token = token;
    this.perfil = perfil;
    this.id_ee = id_ee;
  }
}
