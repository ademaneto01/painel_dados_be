import { TableActions } from '@/components/actions';

interface ClassPlanProps {
  id: string;
  nome: string;
  planos: string;
}

export default class EntitiesClassPlan {
  readonly id: string;
  readonly nome: string;
  readonly planos: string;

  constructor({ id, nome, planos }: ClassPlanProps) {
    this.id = id;
    this.nome = nome;
    this.planos = planos;
  }

  public get acoes(): JSX.Element {
    return (
      <TableActions
        id={this.id}
        titleDelete={this.nome}
        modalClassPlan={this.id}
      />
    );
  }
}
