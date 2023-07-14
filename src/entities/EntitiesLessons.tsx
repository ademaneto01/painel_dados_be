interface LessonProps {
  id: string;
  nome: string;
  descricao: string;
  arquivo: string;
  ano: string;
}
export default class EntitiesLessons {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly arquivo: string;
  readonly ano: string;

  constructor({ id, nome, descricao, arquivo, ano }: LessonProps) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.arquivo = arquivo;
    this.ano = ano;
  }
}
