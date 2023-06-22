import { Lessons} from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface LessonsMockPayload {
  id: string;
  nome: string;
  register: string;
}

export default class MockLessonsSerializers implements SerializerInterface {
  toEntity(otd: LessonsMockPayload): Lessons {
    return new Lessons({
      id: otd.id,
      nome: otd.nome,
      register: otd.register,
    });
  }
}
