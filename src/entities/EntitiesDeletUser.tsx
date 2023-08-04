interface UserProps {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
}

export default class EntitiesDeletUser {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly escola: string;

  constructor({ id, nome, email, perfil, escola }: UserProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.escola = escola;
  }
}
