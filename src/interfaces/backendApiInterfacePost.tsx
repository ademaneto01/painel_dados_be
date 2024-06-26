import {
  EntitiesUserLogin,
  EntitiesContratos,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesCadastroUser,
  EntitiesAgenteExterno,
  EntitiesRegistrarDocContrato,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
  EntitiesVincularAgente,
  EntitiesAlunados,
  EntitiesAcompanhamentoPDG,
  EntitiesAcompanhamentoPDGCriteria,
  EntitiesRegistrarOcorrenciaPDG,
} from '@/entities';

export default interface BackendApiInterfacePost {
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  registrarUsuario(userData: any): Promise<EntitiesCadastroUser[]>;

  registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]>;
  registrarContrato(userData: any): Promise<EntitiesContratos[]>;

  registrarAgente(userData: any): Promise<EntitiesAgenteExterno[]>;

  listarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;

  vincularAgente(userData: any): Promise<EntitiesVincularAgente[]>;

  registrarDocContrato(userData: any): Promise<EntitiesRegistrarDocContrato[]>;

  registrarDocEntidade(userData: any): Promise<EntitiesDocsEntidade[]>;

  registrarInfosContrato(userData: any): Promise<EntitiesInfosContrato[]>;

  registrarAlunados(userData: any): Promise<EntitiesAlunados[]>;

  registrarAcompanhamento(userData: any): Promise<EntitiesAcompanhamentoPDG[]>;

  registrarOcorrenciaPDG(userData: any): Promise<EntitiesRegistrarOcorrenciaPDG[]>;

  registrarAcompanhamentoCriteria(
    userData: any,
  ): Promise<EntitiesAcompanhamentoPDGCriteria[]>;
}
