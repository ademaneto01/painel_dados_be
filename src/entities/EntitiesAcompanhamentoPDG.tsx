import { TableActionAcompanhamentoPDG } from '@/components/actions';

interface UserProps {
  id: string;
  id_ee: string;
  id_prof: string;
  nome_escola: string;
  nome_agente: string;
  dataofobservation: string;
  grade: string;
  ofstudents: string;
  tema: string;
  lessonplanbe: string;
  cycle: string;
  digitalprojector: string;
  board: string;
  englishcorner: string;
  noiselevel: string;
  resourceaudioqlty: string;
  nglbematerials: string;
  lp1lessonplan: string;
  lp2proposedgoals: string;
  lp3resourcesused: string;
  lp4changes: string;
  finalcoments: string;
  finalized: boolean;
  deleted: boolean;
}

export default class EntitiesAcompanhamentoPDG {
  readonly id: string;
  readonly id_ee: string;
  readonly id_prof: string;
  readonly nome_escola: string;
  readonly nome_agente: string;
  readonly dataofobservation: string;
  readonly grade: string;
  readonly ofstudents: string;
  readonly tema: string;
  readonly lessonplanbe: string;
  readonly cycle: string;
  readonly digitalprojector: string;
  readonly board: string;
  readonly englishcorner: string;
  readonly noiselevel: string;
  readonly resourceaudioqlty: string;
  readonly nglbematerials: string;
  readonly lp1lessonplan: string;
  readonly lp2proposedgoals: string;
  readonly lp3resourcesused: string;
  readonly lp4changes: string;
  readonly finalcoments: string;
  readonly finalized: boolean;
  readonly deleted: boolean;

  constructor({
    id,
    id_ee,
    id_prof,
    nome_escola,
    nome_agente,
    dataofobservation,
    grade,
    ofstudents,
    tema,
    lessonplanbe,
    cycle,
    digitalprojector,
    board,
    englishcorner,
    noiselevel,
    resourceaudioqlty,
    nglbematerials,
    lp1lessonplan,
    lp2proposedgoals,
    lp3resourcesused,
    lp4changes,
    finalcoments,
    finalized,
    deleted,
  }: UserProps) {
    this.id = id;
    this.id_ee = id_ee;
    this.id_prof = id_prof;
    this.nome_escola = nome_escola;
    this.nome_agente = nome_agente;
    this.dataofobservation = dataofobservation;
    this.grade = grade;
    this.ofstudents = ofstudents;
    this.tema = tema;
    this.lessonplanbe = lessonplanbe;
    this.cycle = cycle;
    this.digitalprojector = digitalprojector;
    this.board = board;
    this.englishcorner = englishcorner;
    this.noiselevel = noiselevel;
    this.resourceaudioqlty = resourceaudioqlty;
    this.nglbematerials = nglbematerials;
    this.lp1lessonplan = lp1lessonplan;
    this.lp2proposedgoals = lp2proposedgoals;
    this.lp3resourcesused = lp3resourcesused;
    this.lp4changes = lp4changes;
    this.finalcoments = finalcoments;
    this.finalized = finalized;
    this.deleted = deleted;
  }
  public get acoes(): JSX.Element {
    return (
      <TableActionAcompanhamentoPDG
        id={this.id}
        nome={this.nome_escola}
        finalized={this.finalized}
      />
    );
  }
}
