import {
  EntitiesContratos,
  EntitiesTeste,
  EntitiesVincularAgente,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesEntidadesEscolares,
} from '@/entities';

export default interface BackendApiInterfacePut {
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;

  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;

  editarAgente(userData: any): Promise<EntitiesTeste[]>;

  editarEntidadeContratual(userData: any): Promise<EntitiesContratos[]>;

  editarEntidadeEscolar(userData: any): Promise<EntitiesEntidadesEscolares[]>;

  editarUsuario(userData: any): Promise<EntitiesOneUser[]>;

  editarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
}
