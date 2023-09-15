import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesOneUser,
  EntitiesDeletUser,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesRegisterContract,
  EntitiesUsersPDG,
  EntitiesRegisterEntidadeEscolar,
  EntitiesCadastroUser,
} from '@/entities';
import { promises } from 'dns';

export default interface BackendApiInterface {
  localizarUsuarios(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;
  deletarUsuario(userId: any): Promise<EntitiesDeletUser[]>;
  localizarUsuario(userId: any): Promise<EntitiesUsers[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  registrarUsuario(userData: any): Promise<EntitiesCadastroUser[]>;
  localizarContratos(): Promise<EntitiesContratos[]>;
  todasEntidadesEscolares(): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntitadeEscolar(id: any): Promise<EntitiesEntidadesEscolares[]>;
  registerEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegisterEntidadeEscolar[]>;
  registerContract(userData: any): Promise<EntitiesRegisterContract[]>;
  deleteContract(id_contrato: any): Promise<EntitiesContratos[]>;
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;
  getUsersPDG(): Promise<EntitiesUsersPDG[]>;
  findOneContract(id: any): Promise<EntitiesContratos[]>;
  deleteEntidadeEscolar(id_escola: any): Promise<EntitiesEntidadesEscolares[]>;
}
