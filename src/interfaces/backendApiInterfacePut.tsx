import {
  EntitiesContratos,
  EntitiesTeste,
  EntitiesVincularAgente,
  EntitiesInfosContrato,
} from '@/entities';

export default interface BackendApiInterfacePut {
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;

  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;

  editarAgente(userData: any): Promise<EntitiesTeste[]>;

  editarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;
}
