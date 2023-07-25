interface TurmasProps {
  id: string;
  turma: string;
  ano: string;
  professor: string;
  codigo: string;
  languageMaterials: string;
}
export default class EntitiesTurmas {
  readonly id: string;
  readonly turma: string;
  readonly ano: string;
  readonly professor: string;
  readonly codigo: string;
  readonly languageMaterials: string;

  constructor({
    id,
    turma,
    ano,
    professor,
    codigo,
    languageMaterials,
  }: TurmasProps) {
    this.id = id;
    this.turma = turma;
    this.ano = ano;
    this.professor = professor;
    this.codigo = codigo;
    this.languageMaterials = languageMaterials;
  }
}
