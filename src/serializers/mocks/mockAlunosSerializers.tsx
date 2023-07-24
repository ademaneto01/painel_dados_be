import { EntitiesAlunos } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface AlunosMockPayload {
  id: string;
  aluno: string;
  responsavel: string;
  turma: string;
}

export default class MockAlunosSerializers implements SerializerInterface {
  toEntity(otd: AlunosMockPayload): EntitiesAlunos {
    return new EntitiesAlunos({
      id: otd.id,
      aluno: otd.aluno,
      responsavel: otd.responsavel,
      turma: otd.turma,
    });
  }
}
