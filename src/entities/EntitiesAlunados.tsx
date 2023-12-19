interface UserProps {
  id: string;
  id_ee: string;
  ano_ref: string;
  '3EI': string;
  '4EI': string;
  '5EI': string;
  '1EF': string;
  '2EF': string;
  '3EF': string;
  '4EF': string;
  '5EF': string;
  '6EF': string;
  '7EF': string;
  '8EF': string;
  '9EF': string;
  '1EM': string;
  '2EM': string;
  '3EM': string;
}

export default class EntitiesAlunados {
  readonly id: string;
  readonly id_ee: string;
  readonly ano_ref: string;
  readonly '3EI': string;
  readonly '4EI': string;
  readonly '5EI': string;
  readonly '1EF': string;
  readonly '2EF': string;
  readonly '3EF': string;
  readonly '4EF': string;
  readonly '5EF': string;
  readonly '6EF': string;
  readonly '7EF': string;
  readonly '8EF': string;
  readonly '9EF': string;
  readonly '1EM': string;
  readonly '2EM': string;
  readonly '3EM': string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.id_ee = props.id_ee;
    this.ano_ref = props.ano_ref;
    this['3EI'] = props['3EI'];
    this['4EI'] = props['4EI'];
    this['5EI'] = props['5EI'];
    this['1EF'] = props['1EF'];
    this['2EF'] = props['2EF'];
    this['3EF'] = props['3EF'];
    this['4EF'] = props['4EF'];
    this['5EF'] = props['5EF'];
    this['6EF'] = props['6EF'];
    this['7EF'] = props['7EF'];
    this['8EF'] = props['8EF'];
    this['9EF'] = props['9EF'];
    this['1EM'] = props['1EM'];
    this['2EM'] = props['2EM'];
    this['3EM'] = props['3EM'];
  }
}
