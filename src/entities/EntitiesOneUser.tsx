interface UserProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  id_ee: string;
}

export default class EntitiesOneUser {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly senha: string;
  readonly perfil: string;
  readonly id_ee: string;

  constructor({ id, nome, email, senha, perfil, id_ee }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil;
    this.id_ee = id_ee;
  }
}
