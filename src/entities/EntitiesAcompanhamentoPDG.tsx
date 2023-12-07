interface UserProps {
  id_ee: string;
  id_prof: string;
  dataofobservation: string;
  grade: boolean;
  ofstudents: string;
  tema: string;
  lessonplanbe: string;
  cycle: string;
  digitalprojector: boolean;
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
}

export default class EntitiesAcompanhamentoPDG {
  readonly id_ee: string;
  readonly id_prof: string;
  readonly dataofobservation: string;
  readonly grade: boolean;
  readonly ofstudents: string;
  readonly tema: string;
  readonly lessonplanbe: string;
  readonly cycle: string;
  readonly digitalprojector: boolean;
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

  constructor({
    id_ee,
    id_prof,
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
  }: UserProps) {
    this.id_ee = id_ee;
    this.id_prof = id_prof;
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
  }
}
