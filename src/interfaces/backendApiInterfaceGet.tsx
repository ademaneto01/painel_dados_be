import {
  EntitiesUsers,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesUsuariosPDG,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolaresPDG,
  EntitiesVinculosAgentesExterno,
  EntitiesAgenteExterno,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
  EntitiesAlunados,
  EntitiesAcompanhamentoPDG,
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
  listarTodosAgentes(): Promise<EntitiesAgenteExterno[]>;
  localizarAgenteId(id: any): Promise<EntitiesAgenteExterno[]>;
  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;
  listarDocsContrato(uuid_ec: any): Promise<EntitiesDocsContrato[]>;
  listarDocsEntidade(uuid_ee: any): Promise<EntitiesDocsEntidade[]>;
  listarInfosContrato(uuid_ec: any): Promise<EntitiesInfosContrato[]>;
  listarIndividualTurmas(id: any): Promise<EntitiesAlunados[]>;
  listarIndividualAlunados(id: any): Promise<EntitiesAlunados[]>;
  localizarAcompanhamento(id: any): Promise<EntitiesAcompanhamentoPDG[]>;
}
