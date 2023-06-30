import { TableActions } from '@/components/actions';

interface MaterialsProps {
  id: string;
  nome: string;
  grade: string;
  disciplina: string;
  conteudoDigital: string;
}

export default class EntitiesMaterials {
  readonly id: string;
  readonly nome: string;
  readonly grade: string;
  readonly disciplina: string;
  readonly conteudoDigital: string;

  constructor({
    id,
    nome,
    grade,
    disciplina,
    conteudoDigital,
  }: MaterialsProps) {
    this.id = id;
    this.nome = nome;
    this.grade = grade;
    this.disciplina = disciplina;
    this.conteudoDigital = conteudoDigital;
  }

  public get acoes(): JSX.Element {
    return (
      <TableActions
        id={this.id}
        titleDelete={this.nome}
        modalMaterials={this.id}
      />
    );
  }
}
