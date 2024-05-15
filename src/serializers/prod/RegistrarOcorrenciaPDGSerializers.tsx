import { EntitiesRegistrarOcorrenciaPDG } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UserProps {
    id_ocorrencia: string,
    texto_ocorrencia: string,
    user_escola: string,
    id_ee: string;
    id_user: string;
  }

export default class RegistrarOcorrenciaPDGSerializers
  implements SerializerInterface
{
  toEntity(otd: UserProps): EntitiesRegistrarOcorrenciaPDG {
    return new EntitiesRegistrarOcorrenciaPDG({
        id_ocorrencia: otd.id_ocorrencia,
        texto_ocorrencia: otd.texto_ocorrencia,
        user_escola: otd.user_escola,
        id_ee: otd.id_ee,
        id_user: otd.id_user,
    });
  }
}
