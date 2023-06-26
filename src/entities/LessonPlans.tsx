import { TableActions } from "@/components/actions";

interface LessonProps {
  id: string;
  nome: string;
  register: string;
}

export default class Lessons {
  readonly id: string;
  readonly nome: string;
  readonly register: string;

  constructor({
    id,
    nome,
    register,
  }: LessonProps) {
    this.id = id;
    this.nome = nome;
    this.register = register;
  }

  public get acoes(): JSX.Element {
    return <TableActions id={this.id} nome={this.nome} lessonKey={this.id}/>;
  }
}
