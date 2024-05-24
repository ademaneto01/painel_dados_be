interface UserProps {
  id_ocorrencia: string,
  texto_ocorrencia: string,
  user_escola: string,
  id_ee: string;
  id_user: string;
  canal: string;
  tipo: string;
  confidencial: string;
}

export default class EntitiesRegistrarOcorrenciaPDG {
  readonly id_ocorrencia: string;
  readonly id_ee: string;
  readonly user_escola: string;
  readonly id_user: string;
  readonly texto_ocorrencia: string;
  readonly canal: string;
  readonly tipo: string;
  readonly confidencial: string;

  constructor({
    id_ocorrencia,
    id_ee,
    user_escola,
    id_user,
    texto_ocorrencia,
    tipo,
    canal,
    confidencial,
  }: UserProps) {
    this.id_ocorrencia = id_ocorrencia;
    this.id_ee = id_ee;
    this.id_user = id_user;
    this.user_escola = user_escola;
    this.texto_ocorrencia = texto_ocorrencia;
    this.canal = canal;
    this.confidencial = confidencial;
    this.tipo = tipo;
  }
}
