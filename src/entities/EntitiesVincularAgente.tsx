interface VinculoAgenteProps {
  id: string;
  id_prof: string;
  id_escola: string;
  especialista: boolean;
  bo_3ei: boolean;
  bo_4ei: boolean;
  bo_5ei: boolean;
  bo_1ai: boolean;
  bo_2ai: boolean;
  bo_3ai: boolean;
  bo_4ai: boolean;
  bo_5ai: boolean;
  bo_6af: boolean;
  bo_7af: boolean;
  bo_8af: boolean;
  bo_9af: boolean;
  bo_1em: boolean;
  bo_2em: boolean;
  bo_3em: boolean;
}

export default class EntitiesVincularAgente {
  readonly id: string;
  readonly id_prof: string;
  readonly id_escola: string;
  readonly especialista: boolean;
  readonly bo_3ei: boolean;
  readonly bo_4ei: boolean;
  readonly bo_5ei: boolean;
  readonly bo_1ai: boolean;
  readonly bo_2ai: boolean;
  readonly bo_3ai: boolean;
  readonly bo_4ai: boolean;
  readonly bo_5ai: boolean;
  readonly bo_6af: boolean;
  readonly bo_7af: boolean;
  readonly bo_8af: boolean;
  readonly bo_9af: boolean;
  readonly bo_1em: boolean;
  readonly bo_2em: boolean;
  readonly bo_3em: boolean;

  constructor({
    id,
    id_prof,
    id_escola,
    especialista,
    bo_3ei,
    bo_4ei,
    bo_5ei,
    bo_1ai,
    bo_2ai,
    bo_3ai,
    bo_4ai,
    bo_5ai,
    bo_6af,
    bo_7af,
    bo_8af,
    bo_9af,
    bo_1em,
    bo_2em,
    bo_3em,
  }: VinculoAgenteProps) {
    this.id = id;
    this.id_prof = id_prof;
    this.id_escola = id_escola;
    this.especialista = especialista;
    this.bo_3ei = bo_3ei;
    this.bo_4ei = bo_4ei;
    this.bo_5ei = bo_5ei;
    this.bo_1ai = bo_1ai;
    this.bo_2ai = bo_2ai;
    this.bo_3ai = bo_3ai;
    this.bo_4ai = bo_4ai;
    this.bo_5ai = bo_5ai;
    this.bo_6af = bo_6af;
    this.bo_7af = bo_7af;
    this.bo_8af = bo_8af;
    this.bo_9af = bo_9af;
    this.bo_1em = bo_1em;
    this.bo_2em = bo_2em;
    this.bo_3em = bo_3em;
  }
}
