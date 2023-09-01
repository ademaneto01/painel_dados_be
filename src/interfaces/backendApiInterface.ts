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
} from '@/entities';

export default interface BackendApiInterface {
  getUsers(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;
  deleteUser(userId: any): Promise<EntitiesDeletUser[]>;
  findOneUser(userId: any): Promise<EntitiesOneUser[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  cadastroUser(userData: any): Promise<EntitiesOneUser[]>;
  findContratos(userData: any): Promise<EntitiesContratos[]>;
  getEntitadesEscolares(userData: any): Promise<EntitiesEntidadesEscolares[]>;
  getEntitadeEscolar(id: any): Promise<EntitiesEntidadesEscolares[]>;
  registerEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegisterEntidadeEscolar[]>;
  registerContract(userData: any): Promise<EntitiesRegisterContract[]>;
  deleteContract(id_contrato: any): Promise<EntitiesContratos[]>;
  getUsersPDG(): Promise<EntitiesUsersPDG[]>;
  findOneContract(id: any): Promise<EntitiesContratos[]>;
  deleteEntidadeEscolar(id_escola: any): Promise<EntitiesEntidadesEscolares[]>;
}
