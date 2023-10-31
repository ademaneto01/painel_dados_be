import {
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesVincularAgente,
  EntitiesTeste,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfacePut, SerializerInterface } from '@/interfaces';
import {
  MockOneUserSerializers,
  MockTeste,
  MockVincularAgente,
  MockContratosSerializers,
  MockEntidadesEscolaresSerializers,
  MockInfosContrato,
} from '@/serializers/mocks';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiPut implements BackendApiInterfacePut {
  private api: AxiosInstance;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || undefined;

    this.api = axios.create({
      baseURL: 'http://localhost:3001',
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
      new MockOneUserSerializers(),
    );
  }

  public async sobrescreverContrato(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.put<EntitiesContratos>(
      '/sobrescreverContrato',
      userData,
      new MockContratosSerializers(),
    );
  }

  public async editarEntidadeContratual(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.put<EntitiesContratos>(
      '/editarEntidadeContratual',
      userData,
      new MockContratosSerializers(),
    );
  }

  public async editarAgente(userData: any): Promise<EntitiesTeste[]> {
    return await this.put<EntitiesTeste>(
      '/editarAgente',
      userData,
      new MockTeste(),
    );
  }

  public async editarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.put<EntitiesEntidadesEscolares>(
      '/editarEntidadeEscolar',
      userData,
      new MockEntidadesEscolaresSerializers(),
    );
  }

  public async editarInfosContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.put<EntitiesInfosContrato>(
      '/editarInfosContrato',
      userData,
      new MockInfosContrato(),
    );
  }

  public async editarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.put<EntitiesVincularAgente>(
      '/editarVinculoAgente',
      userData,
      new MockVincularAgente(),
    );
  }

  private async put<T>(
    route: string,
    serializer: SerializerInterface,
    params: any,
  ): Promise<T[]> {
    const response = await this.api.get(route, { params });
    return this.serializeOrError<T>(response, serializer);
  }

  private serializeOrError<T>(
    response: AxiosResponse,
    serializer: SerializerInterface,
  ): T[] {
    if (response.status === 200) {
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
