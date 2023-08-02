interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

export default class EntitiesOneUser {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;

  constructor({ id, nome, email, perfil }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
  }
}
