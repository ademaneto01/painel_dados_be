interface VinculoAgenteProps {
  id: string;
  id_prof: string;
  id_escola: string;
  especialista: boolean;
  readonly bo_3EI: boolean;
  readonly bo_4EI: boolean;
  readonly bo_5EI: boolean;
  readonly bo_1AI: boolean;
  readonly bo_2AI: boolean;
  readonly bo_3AI: boolean;
  readonly bo_4AI: boolean;
  readonly bo_5AI: boolean;
  readonly bo_6Af: boolean;
  readonly bo_7AF: boolean;
  readonly bo_8AF: boolean;
  readonly bo_9AF: boolean;
}

export default class EntitiesVincularAgente {
  readonly id: string;
  readonly id_prof: string;
  readonly id_escola: string;
  readonly especialista: boolean;
  readonly bo_3EI: boolean;
  readonly bo_4EI: boolean;
  readonly bo_5EI: boolean;
  readonly bo_1AI: boolean;
  readonly bo_2AI: boolean;
  readonly bo_3AI: boolean;
  readonly bo_4AI: boolean;
  readonly bo_5AI: boolean;
  readonly bo_6Af: boolean;
  readonly bo_7AF: boolean;
  readonly bo_8AF: boolean;
  readonly bo_9AF: boolean;

  constructor({
    id,
    id_prof,
    id_escola,
    especialista,
    bo_3EI,
    bo_4EI,
    bo_5EI,
    bo_1AI,
    bo_2AI,
    bo_3AI,
    bo_4AI,
    bo_5AI,
    bo_6Af,
    bo_7AF,
    bo_8AF,
    bo_9AF,
  }: VinculoAgenteProps) {
    this.id = id;
    this.id_prof = id_prof;
    this.id_escola = id_escola;
    this.especialista = especialista;
    this.bo_3EI = bo_3EI;
    this.bo_4EI = bo_4EI;
    this.bo_5EI = bo_5EI;
    this.bo_1AI = bo_1AI;
    this.bo_2AI = bo_2AI;
    this.bo_3AI = bo_3AI;
    this.bo_4AI = bo_4AI;
    this.bo_5AI = bo_5AI;
    this.bo_6Af = bo_6Af;
    this.bo_7AF = bo_7AF;
    this.bo_8AF = bo_8AF;
    this.bo_9AF = bo_9AF;
  }
}
