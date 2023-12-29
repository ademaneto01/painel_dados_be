import {
  EntitiesContratos,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesRegistrarDocContrato,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesUserLogin,
  EntitiesVincularAgente,
  EntitiesAgenteExterno,
  EntitiesAlunados,
  EntitiesAcompanhamentoPDG,
  EntitiesAcompanhamentoPDGCriteria,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfacePost, SerializerInterface } from '@/interfaces';
import {
  UserLoginSerializers,
  CadastroSerializers,
  RegistrarEntidadeEscolarSerializers,
  AgenteExternoSerializers,
  VincularAgenteSerializers,
  RegistrarDocContratoSerializers,
  DocsEntitadeSerializers,
  ContratosSerializers,
  InfosContratoSerializers,
  AlunadosSerializers,
  AcompanhamentoPDGSerializers,
  AcompanhamentoPDGCriteriaSerializers,
} from '@/serializers/prod';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiPost implements BackendApiInterfacePost {
  private api: AxiosInstance;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || undefined;

    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.accessToken
          ? `Bearer ${this.accessToken}`
          : undefined,
      },
    });
  }

  public async userLogin(userData: any): Promise<EntitiesUserLogin[]> {
    return await this.post<EntitiesUserLogin>(
      '/login',
      userData,
      new UserLoginSerializers(),
    );
  }

  public async registrarUsuario(userData: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/registrarUsuario',
      userData,
      new CadastroSerializers(),
    );
  }

  public async registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]> {
    return await this.post<EntitiesRegistrarEntidadeEscolar>(
      '/registrarEntidadeEscolar',
      userData,
      new RegistrarEntidadeEscolarSerializers(),
    );
  }

  public async registrarDocContrato(
    userData: any,
  ): Promise<EntitiesRegistrarDocContrato[]> {
    return await this.post<EntitiesRegistrarDocContrato>(
      '/registrarDocContrato',
      userData,
      new RegistrarDocContratoSerializers(),
    );
  }
  public async registrarAlunados(userData: any): Promise<EntitiesAlunados[]> {
    return await this.post<EntitiesAlunados>(
      '/registrarAlunados',
      userData,
      new AlunadosSerializers(),
    );
  }

  public async registrarDocEntidade(
    userData: any,
  ): Promise<EntitiesDocsEntidade[]> {
    return await this.post<EntitiesDocsEntidade>(
      '/registrarDocEntidade',
      userData,
      new DocsEntitadeSerializers(),
    );
  }

  public async registrarContrato(userData: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/registrarEntidadeContratual',
      userData,
      new ContratosSerializers(),
    );
  }

  public async registrarInfosContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.post<EntitiesInfosContrato>(
      '/registrarInfosContrato',
      userData,
      new InfosContratoSerializers(),
    );
  }

  public async registrarAgente(
    userData: any,
  ): Promise<EntitiesAgenteExterno[]> {
    return await this.post<EntitiesAgenteExterno>(
      '/registrarAgente',
      userData,
      new AgenteExternoSerializers(),
    );
  }

  public async registrarAcompanhamento(
    userData: any,
  ): Promise<EntitiesAcompanhamentoPDG[]> {
    return await this.post<EntitiesAcompanhamentoPDG>(
      '/registrarAcompanhamento',
      userData,
      new AcompanhamentoPDGSerializers(),
    );
  }
  public async registrarAcompanhamentoCriteria(
    userData: any,
  ): Promise<EntitiesAcompanhamentoPDGCriteria[]> {
    return await this.post<EntitiesAcompanhamentoPDGCriteria>(
      '/registrarAcompanhamentoCriteria',
      userData,
      new AcompanhamentoPDGCriteriaSerializers(),
    );
  }

  public async vincularAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/vincularAgente',
      userData,
      new VincularAgenteSerializers(),
    );
  }
  public async listarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/listarVinculoAgente',
      userData,
      new VincularAgenteSerializers(),
    );
  }

  private async post<T>(
    route: string,
    data: any,
    serializer: SerializerInterface,
  ): Promise<T[]> {
    const response = await this.api.post(route, data);

    return this.serializeOrError<T>(response, serializer);
  }

  private serializeOrError<T>(
    response: AxiosResponse,
    serializer: SerializerInterface,
  ): T[] {
    if (response.status === 200 || response.status === 201) {
      const entities: T[] = [];
      for (let otd of response.data) {
        const entity = serializer.toEntity(otd);

        entities.push(entity);
      }

      return entities;
    } else {
      throw new FailedToFetchError();
    }
  }
}
