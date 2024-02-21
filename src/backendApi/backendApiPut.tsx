import {
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesVincularAgente,
  EntitiesAgenteExterno,
  EntitiesAlunados,
  EntitiesAcompanhamentoPDG,
  EntitiesAcompanhamentoPDGCriteria,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfacePut, SerializerInterface } from '@/interfaces';
import {
  OneUserSerializers,
  AgenteExternoSerializers,
  VincularAgenteSerializers,
  ContratosSerializers,
  EntidadesEscolaresSerializers,
  InfosContratoSerializers,
  AlunadosSerializers,
  AcompanhamentoPDGSerializers,
  AcompanhamentoPDGCriteriaSerializers,
} from '@/serializers/prod';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiPut implements BackendApiInterfacePut {
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

  public async editarUsuario(userData: any): Promise<EntitiesOneUser[]> {
    return await this.put<EntitiesOneUser>(
      '/editarUsuario',
      userData,
      new OneUserSerializers(),
    );
  }

  public async editarUsuarioAtivo(userData: any): Promise<EntitiesOneUser[]> {
    return await this.put<EntitiesOneUser>(
      '/editarUsuarioAtivo',
      userData,
      new OneUserSerializers(),
    );
  }

  public async sobrescreverContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.put<EntitiesInfosContrato>(
      '/sobrescreverContrato',
      userData,
      new InfosContratoSerializers(),
    );
  }

  public async editarEntidadeContratual(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.put<EntitiesContratos>(
      '/editarEntidadeContratual',
      userData,
      new ContratosSerializers(),
    );
  }

  public async editarAtivoContrato(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.put<EntitiesContratos>(
      '/editarAtivoContrato',
      userData,
      new ContratosSerializers(),
    );
  }

  public async editarAtivoEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.put<EntitiesEntidadesEscolares>(
      '/editarAtivoEntidadeEscolar',
      userData,
      new EntidadesEscolaresSerializers(),
    );
  }

  public async editarAgente(userData: any): Promise<EntitiesAgenteExterno[]> {
    return await this.put<EntitiesAgenteExterno>(
      '/editarAgente',
      userData,
      new AgenteExternoSerializers(),
    );
  }

  public async editarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.put<EntitiesEntidadesEscolares>(
      '/editarEntidadeEscolar',
      userData,
      new EntidadesEscolaresSerializers(),
    );
  }

  public async editarInfosContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.put<EntitiesInfosContrato>(
      '/editarInfosContrato',
      userData,
      new InfosContratoSerializers(),
    );
  }

  public async editarAcompanhamento(
    userData: any,
  ): Promise<EntitiesAcompanhamentoPDG[]> {
    return await this.put<EntitiesAcompanhamentoPDG>(
      '/editarAcompanhamento',
      userData,
      new AcompanhamentoPDGSerializers(),
    );
  }

  public async editarCriteria(
    userData: any,
  ): Promise<EntitiesAcompanhamentoPDGCriteria[]> {
    return await this.put<EntitiesAcompanhamentoPDGCriteria>(
      '/editarCriteria',
      userData,
      new AcompanhamentoPDGCriteriaSerializers(),
    );
  }

  public async editarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.put<EntitiesVincularAgente>(
      '/editarVinculoAgente',
      userData,
      new VincularAgenteSerializers(),
    );
  }

  public async editarAlunados(userData: any): Promise<EntitiesAlunados[]> {
    return await this.put<EntitiesAlunados>(
      '/editarAlunados',
      userData,
      new AlunadosSerializers(),
    );
  }

  private async put<T>(
    route: string,
    userData: any,
    serializer: SerializerInterface,
  ): Promise<T[]> {
    const response = await this.api.put(route, userData);
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
