import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesUsuariosPDG,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesCadastroUser,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolaresPDG,
  EntitiesVinculosAgentesExterno,
  EntitiesTeste,
  EntitiesVincularAgente,
  EntitiesRegistrarDocContrato,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
} from '@/entities';

export default interface BackendApiInterface {
  localizarUsuarios(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;
  deletarUsuario(userId: any): Promise<string[]>;
  localizarUsuario(userId: any): Promise<EntitiesUsers[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  registrarUsuario(userData: any): Promise<EntitiesCadastroUser[]>;
  localizarContratos(): Promise<EntitiesContratos[]>;
  todasEntidadesEscolares(): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]>;

  localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntitadeEscolar(id: any): Promise<EntitiesEditarEntidadeEscolar[]>;
  registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]>;
  registrarContrato(userData: any): Promise<EntitiesContratos[]>;
  deletarContrato(uuid_ec: any): Promise<string>;
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;
  localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]>;
  localizarContrato(id: any): Promise<EntitiesContratos[]>;
  deletarEntidadeEscolar(id: any): Promise<string>;
  listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]>;
  listarTodosAgentes(): Promise<EntitiesTeste[]>;
  vincularAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  deletarVinculoAgente(userData: any): Promise<string>;
  localizarAgenteId(id: any): Promise<EntitiesTeste[]>;
  listarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;
  registrarAgente(userData: any): Promise<EntitiesTeste[]>;
  deletarAgente(userId: any): Promise<string>;
  editarAgente(userData: any): Promise<EntitiesTeste[]>;
  registrarDocContrato(userData: any): Promise<EntitiesRegistrarDocContrato[]>;
  listarDocsContrato(uuid_ec: any): Promise<EntitiesDocsContrato[]>;
  deletarDocContrato(id: any): Promise<string>;
  listarDocsEntidade(uuid_ee: any): Promise<EntitiesDocsEntidade[]>;
  deletarDocEntidade(id: any): Promise<string>;
  registrarDocEntidade(userData: any): Promise<EntitiesDocsEntidade[]>;
  listarInfosContrato(uuid_ec: any): Promise<EntitiesInfosContrato[]>;
  registrarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
  deletarInfosContrato(id: any): Promise<string>;
  editarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
}
