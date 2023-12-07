import { EntitiesAcompanhamentoPDG } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AcompanhamentoPDGPayload {
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

export default class AcompanhamentoPDGSerializers
  implements SerializerInterface
{
  toEntity(otd: AcompanhamentoPDGPayload): EntitiesAcompanhamentoPDG {
    return new EntitiesAcompanhamentoPDG({
      id_ee: otd.id_ee,
      id_prof: otd.id_prof,
      dataofobservation: otd.dataofobservation,
      grade: otd.grade,
      ofstudents: otd.ofstudents,
      tema: otd.tema,
      lessonplanbe: otd.lessonplanbe,
      cycle: otd.cycle,
      digitalprojector: otd.digitalprojector,
      board: otd.board,
      englishcorner: otd.englishcorner,
      noiselevel: otd.noiselevel,
      resourceaudioqlty: otd.resourceaudioqlty,
      nglbematerials: otd.nglbematerials,
      lp1lessonplan: otd.lp1lessonplan,
      lp2proposedgoals: otd.lp2proposedgoals,
      lp3resourcesused: otd.lp3resourcesused,
      lp4changes: otd.lp4changes,
      finalcoments: otd.finalcoments,
      finalized: otd.finalized,
    });
  }
}
