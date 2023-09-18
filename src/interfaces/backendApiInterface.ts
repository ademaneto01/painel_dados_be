import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesDeletUser,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesUsuariosPDG,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesCadastroUser,
  EntitiesEditarEntidadeEscolar,
} from '@/entities';

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
  localizarEntitadeEscolar(id: any): Promise<EntitiesEditarEntidadeEscolar[]>;
  registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]>;
  registrarContrato(userData: any): Promise<EntitiesContratos[]>;
  deletarContrato(uuid_ec: any): Promise<EntitiesContratos[]>;
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;
  localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]>;
  localizarContrato(id: any): Promise<EntitiesContratos[]>;
  deletarEntidadeEscolar(id: any): Promise<EntitiesEntidadesEscolares[]>;
}
