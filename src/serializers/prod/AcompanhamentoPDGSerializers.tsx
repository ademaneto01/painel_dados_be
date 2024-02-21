import { EntitiesAcompanhamentoPDG } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AcompanhamentoPDGPayload {
  id: string;
  id_ee: string;
  id_prof: string;
  id_user: string;
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

export default class AcompanhamentoPDGSerializers
  implements SerializerInterface
{
  toEntity(otd: AcompanhamentoPDGPayload): EntitiesAcompanhamentoPDG {
    return new EntitiesAcompanhamentoPDG({
      id: otd.id,
      id_ee: otd.id_ee,
      id_prof: otd.id_prof,
      id_user: otd.id_user,
      nome_escola: otd.nome_escola,
      nome_agente: otd.nome_agente,
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
      deleted: otd.deleted,
    });
  }
}
