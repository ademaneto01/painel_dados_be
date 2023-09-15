interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  id_ee: string;
}

export default class EntitiesCadastroUser {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly id_ee: string;

  constructor({ id, nome, email, perfil, id_ee }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.id_ee = id_ee;
  }
}
