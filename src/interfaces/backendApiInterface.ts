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
  EntitiesAgenteExternoVinculo,
  EntitiesAgenteExterno,
  EntitiesVincularAgente,
  EntitiesRegistrarDocContrato,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
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
  ): Promise<EntitiesAgenteExternoVinculo[]>;
  listarTodosAgentes(): Promise<EntitiesAgenteExterno[]>;
  vincularAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  deletarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarAgenteId(id: any): Promise<EntitiesAgenteExterno[]>;
  listarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;
  registrarAgente(userData: any): Promise<EntitiesAgenteExterno[]>;
  deletarAgente(userId: any): Promise<EntitiesAgenteExterno[]>;
  editarAgente(userData: any): Promise<EntitiesAgenteExterno[]>;
  registrarDocContrato(userData: any): Promise<EntitiesRegistrarDocContrato[]>;
  listarDocsContrato(uuid_ec: any): Promise<EntitiesDocsContrato[]>;
  deletarDocContrato(id: any): Promise<EntitiesDocsContrato[]>;
  listarDocsEntidade(uuid_ee: any): Promise<EntitiesDocsEntidade[]>;
  deletarDocEntidade(id: any): Promise<EntitiesDocsEntidade[]>;
  registrarDocEntidade(userData: any): Promise<EntitiesDocsEntidade[]>;
}
