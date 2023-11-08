import {
  EntitiesContratos,
  EntitiesDocsEntidade,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesRegistrarDocContrato,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesUserLogin,
  EntitiesVincularAgente,
  EntitiesTeste,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfacePost, SerializerInterface } from '@/interfaces';
import {
  MockUserLogin,
  MockCadastroSerializers,
  MockRegistrarEntidadeEscolar,
  MockTeste,
  MockVincularAgente,
  MockRegistrarDocContrato,
  MockDocsEntitade,
  MockContratosSerializers,
  MockInfosContrato,
} from '@/serializers/mocks';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiPost implements BackendApiInterfacePost {
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

  public async userLogin(userData: any): Promise<EntitiesUserLogin[]> {
    return await this.post<EntitiesUserLogin>(
      '/login',
      userData,
      new MockUserLogin(),
    );
  }

  public async registrarUsuario(userData: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/registrarUsuario',
      userData,
      new MockCadastroSerializers(),
    );
  }

  public async registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]> {
    return await this.post<EntitiesRegistrarEntidadeEscolar>(
      '/registrarEntidadeEscolar',
      userData,
      new MockRegistrarEntidadeEscolar(),
    );
  }

  public async registrarDocContrato(
    userData: any,
  ): Promise<EntitiesRegistrarDocContrato[]> {
    return await this.post<EntitiesRegistrarDocContrato>(
      '/registrarDocContrato',
      userData,
      new MockRegistrarDocContrato(),
    );
  }

  public async registrarDocEntidade(
    userData: any,
  ): Promise<EntitiesDocsEntidade[]> {
    return await this.post<EntitiesDocsEntidade>(
      '/registrarDocEntidade',
      userData,
      new MockDocsEntitade(),
    );
  }

  public async registrarContrato(userData: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/registrarEntidadeContratual',
      userData,
      new MockContratosSerializers(),
    );
  }

  public async registrarInfosContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.post<EntitiesInfosContrato>(
      '/registrarInfosContrato',
      userData,
      new MockInfosContrato(),
    );
  }

  public async registrarAgente(userData: any): Promise<EntitiesTeste[]> {
    return await this.post<EntitiesTeste>(
      '/registrarAgente',
      userData,
      new MockTeste(),
    );
  }

  public async vincularAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/vincularAgente',
      userData,
      new MockVincularAgente(),
    );
  }
  public async listarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/listarVinculoAgente',
      userData,
      new MockVincularAgente(),
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
