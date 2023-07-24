interface ProfessoresProps {
  id: string;
  professor: string;
  turma: string;
}
export default class EntitiesProfessores {
  readonly id: string;
  readonly professor: string;
  readonly turma: string;

  constructor({ id, professor, turma }: ProfessoresProps) {
    this.id = id;
    this.professor = professor;
    this.turma = turma;
  }
}
