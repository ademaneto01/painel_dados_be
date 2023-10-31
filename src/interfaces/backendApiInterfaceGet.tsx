import {
  EntitiesUsers,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesUsuariosPDG,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolaresPDG,
  EntitiesVinculosAgentesExterno,
  EntitiesTeste,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
} from '@/entities';

export default interface BackendApiInterfaceGet {
  localizarUsuarios(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;

  localizarUsuario(userId: any): Promise<EntitiesUsers[]>;

  localizarContratos(): Promise<EntitiesContratos[]>;
  todasEntidadesEscolares(): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]>;

  localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntidadeEscolar(id: any): Promise<EntitiesEditarEntidadeEscolar[]>;

  localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]>;
  localizarContrato(id: any): Promise<EntitiesContratos[]>;

  listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]>;
  listarTodosAgentes(): Promise<EntitiesTeste[]>;

  localizarAgenteId(id: any): Promise<EntitiesTeste[]>;

  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;

  listarDocsContrato(uuid_ec: any): Promise<EntitiesDocsContrato[]>;

  listarDocsEntidade(uuid_ee: any): Promise<EntitiesDocsEntidade[]>;

  listarInfosContrato(uuid_ec: any): Promise<EntitiesInfosContrato[]>;
}
