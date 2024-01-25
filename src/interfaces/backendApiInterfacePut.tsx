import {
  EntitiesContratos,
  EntitiesAgenteExterno,
  EntitiesVincularAgente,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesEntidadesEscolares,
  EntitiesAlunados,
} from '@/entities';

export default interface BackendApiInterfacePut {
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;

  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;

  editarAgente(userData: any): Promise<EntitiesAgenteExterno[]>;

  editarEntidadeContratual(userData: any): Promise<EntitiesContratos[]>;

  editarAtivoContrato(userData: any): Promise<EntitiesContratos[]>;

  editarEntidadeEscolar(userData: any): Promise<EntitiesEntidadesEscolares[]>;

  editarAtivoEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]>;

  editarUsuario(userData: any): Promise<EntitiesOneUser[]>;

  editarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;

  editarAlunados(userData: any): Promise<EntitiesAlunados[]>;
}
