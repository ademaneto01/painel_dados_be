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
  deletarUsuario(userId: any): Promise<EntitiesDeletUser[]>;
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
  deletarContrato(uuid_ec: any): Promise<EntitiesContratos[]>;
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;
  localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]>;
  localizarContrato(id: any): Promise<EntitiesContratos[]>;
  deletarEntidadeEscolar(id: any): Promise<EntitiesEntidadesEscolares[]>;
  listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]>;
  listarTodosAgentes(): Promise<EntitiesTeste[]>;
  vincularAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  deletarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarAgenteId(id: any): Promise<EntitiesTeste[]>;
  listarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;
  registrarAgente(userData: any): Promise<EntitiesTeste[]>;
  deletarAgente(userId: any): Promise<EntitiesTeste[]>;
  editarAgente(userData: any): Promise<EntitiesTeste[]>;
  registrarDocContrato(userData: any): Promise<EntitiesRegistrarDocContrato[]>;
  listarDocsContrato(uuid_ec: any): Promise<EntitiesDocsContrato[]>;
  deletarDocContrato(id: any): Promise<EntitiesDocsContrato[]>;
  listarDocsEntidade(uuid_ee: any): Promise<EntitiesDocsEntidade[]>;
  deletarDocEntidade(id: any): Promise<EntitiesDocsEntidade[]>;
  registrarDocEntidade(userData: any): Promise<EntitiesDocsEntidade[]>;
  listarInfosContrato(uuid_ec: any): Promise<EntitiesInfosContrato[]>;
  registrarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
  deletarInfosContrato(id: any): Promise<EntitiesInfosContrato[]>;
  editarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
}
