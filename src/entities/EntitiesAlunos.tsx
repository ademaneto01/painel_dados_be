interface AlunosProps {
  id: string;
  aluno: string;
  responsavel: string;
  turma: string;
}
export default class EntitiesAlunos {
  readonly id: string;
  readonly aluno: string;
  readonly responsavel: string;
  readonly turma: string;

  constructor({ id, aluno, responsavel, turma }: AlunosProps) {
    this.id = id;
    this.aluno = aluno;
    this.responsavel = responsavel;
    this.turma = turma;
  }
}
