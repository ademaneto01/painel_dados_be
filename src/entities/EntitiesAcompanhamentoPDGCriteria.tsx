interface UserProps {
  id: string;
  id_acmp: string;
  e1: string;
  e2: string;
  e3: string;
  e4: string;
  e5: string;
  e6: string;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  l6: string;
  finalized: boolean;
  finalizedtimestamp: string;
  deleted: boolean;
}

export default class EntitiesAcompanhamentoPDGCriteria {
  readonly id: string;
  readonly id_acmp: string;
  readonly e1: string;
  readonly e2: string;
  readonly e3: string;
  readonly e4: string;
  readonly e5: string;
  readonly e6: string;
  readonly m1: string;
  readonly m2: string;
  readonly m3: string;
  readonly m4: string;
  readonly m5: string;
  readonly m6: string;
  readonly l1: string;
  readonly l2: string;
  readonly l3: string;
  readonly l4: string;
  readonly l5: string;
  readonly l6: string;
  readonly finalized: boolean;
  readonly finalizedtimestamp: string;
  readonly deleted: boolean;

  constructor({
    id,
    id_acmp,
    e1,
    e2,
    e3,
    e4,
    e5,
    e6,
    m1,
    m2,
    m3,
    m4,
    m5,
    m6,
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    finalized,
    finalizedtimestamp,
    deleted,
  }: UserProps) {
    this.id = id;
    this.id_acmp = id_acmp;
    this.e1 = e1;
    this.e2 = e2;
    this.e3 = e3;
    this.e4 = e4;
    this.e5 = e5;
    this.e6 = e6;
    this.m1 = m1;
    this.m2 = m2;
    this.m3 = m3;
    this.m4 = m4;
    this.m5 = m5;
    this.m6 = m6;
    this.l1 = l1;
    this.l2 = l2;
    this.l3 = l3;
    this.l4 = l4;
    this.l5 = l5;
    this.l6 = l6;
    this.finalized = finalized;
    this.finalizedtimestamp = finalizedtimestamp;
    this.deleted = deleted;
  }
}
