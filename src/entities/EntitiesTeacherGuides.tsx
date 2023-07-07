interface TeacherGuidesProps {
  id: string;
  nome: string;
  unidades: string;
  aulas: string;
  ano: string;
  material: string;
}
export default class EntitiesTeacherGuides {
  readonly id: string;
  readonly nome: string;
  readonly unidades: string;
  readonly aulas: string;
  readonly ano: string;
  readonly material: string;

  constructor({
    id,
    nome,
    unidades,
    aulas,
    ano,
    material,
  }: TeacherGuidesProps) {
    this.id = id;
    this.nome = nome;
    this.unidades = unidades;
    this.aulas = aulas;
    this.ano = ano;
    this.material = material;
  }
}
