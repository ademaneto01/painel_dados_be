import { TableActions } from '@/components/actions';

interface documentationProps {
  id: string;
  nome: string;
  register: string;
}

export default class EntitiesDocumentation {
  readonly id: string;
  readonly nome: string;
  readonly register: string;

  constructor({ id, nome, register }: documentationProps) {
    this.id = id;
    this.nome = nome;
    this.register = register;
  }

  public get acoes(): JSX.Element {
    return (
      <TableActions
        id={this.id}
        titleDelete={this.nome}
        documentationKey={this.id}
      />
    );
  }
}
