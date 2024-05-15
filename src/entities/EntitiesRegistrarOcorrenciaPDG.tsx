interface UserProps {
  id_ocorrencia: string,
  texto_ocorrencia: string,
  user_escola: string,
  id_ee: string;
  id_user: string;
}

export default class EntitiesRegistrarOcorrenciaPDG {
  readonly id_ocorrencia: string;
  readonly id_ee: string;
  readonly user_escola: string;
  readonly id_user: string;
  readonly texto_ocorrencia: string;

  constructor({
    id_ocorrencia,
    id_ee,
    user_escola,
    id_user,
    texto_ocorrencia,
  }: UserProps) {
    this.id_ocorrencia = id_ocorrencia;
    this.id_ee = id_ee;
    this.id_user = id_user;
    this.user_escola = user_escola;
    this.texto_ocorrencia = texto_ocorrencia;
  }
}
