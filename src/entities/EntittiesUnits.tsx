import { TableActions } from '@/components/actions';

interface UnitsProps {
  id: string;
  nome: string;
  planos: string;
  doc: string;
}

export default class EntitiesUnits {
  readonly id: string;
  readonly nome: string;
  readonly planos: string;
  readonly doc: string;

  constructor({ id, nome, planos, doc }: UnitsProps) {
    this.id = id;
    this.nome = nome;
    this.planos = planos;
    this.doc = doc;
  }

  public get acoes(): JSX.Element {
    return (
      <TableActions
        id={this.id}
        titleDelete={this.nome}
        calendar={'true'}
        unitsKey={this.id}
        urlDoc={this.doc}
      />
    );
  }
}
