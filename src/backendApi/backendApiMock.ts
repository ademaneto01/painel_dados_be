import {
  EntitiesContratos,
  EntitiesDeletUser,
  EntitiesEntidadesEscolares,
  EntitiesOneUser,
  EntitiesRegisterContract,
  EntitiesRegisterEntidadeEscolar,
  EntitiesUrl,
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesUsersPDG,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterface, SerializerInterface } from '@/interfaces';
import {
  MockUserLogin,
  MockUsersSerializers,
  MockOneUserSerializers,
  MockDeleteUserSerializers,
  MockCadastroSerializers,
  MockUrlSerializers,
  MockRegisterContractSerializers,
  MockDeleteContratoSerializers,
  MockUsersPDG,
  MockRegisterEntitiesEscolaresSerializers,
} from '@/serializers/mocks';
import MockContratosSerializers from '@/serializers/mocks/MockContratosSerializers';
import MockEntidadesEscolaresSerializers from '@/serializers/mocks/MockEntidadesEscolaresSerializers';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiMock implements BackendApiInterface {
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

  public async getUsers(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/findUsers',
      new MockUsersSerializers(),
    );
  }

  public async getUsersPDG(): Promise<EntitiesUsersPDG[]> {
    return await this.get<EntitiesUsersPDG>(
      '/findUsersPDG',
      new MockUsersPDG(),
    );
  }

  public async findContratos(): Promise<EntitiesContratos[]> {
    return await this.get<EntitiesContratos>(
      '/findContracts',
      new MockContratosSerializers(),
    );
  }
  public async getUrl(userId: any): Promise<EntitiesUrl[]> {
    return await this.post<EntitiesUrl>(
      '/findDadosUser',
      userId,
      new MockUrlSerializers(),
    );
  }
  public async updateUser(userData: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/update',
      userData,
      new MockOneUserSerializers(),
    );
  }
  public async registerEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegisterEntidadeEscolar[]> {
    return await this.post<EntitiesRegisterEntidadeEscolar>(
      '/registerEntidadeEscolar',
      userData,
      new MockRegisterEntitiesEscolaresSerializers(),
    );
  }
  public async findOneContract(id: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/findOneContract',
      id,
      new MockContratosSerializers(),
    );
  }

  public async sobrescreverContrato(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/sobrescreverContrato',
      userData,
      new MockContratosSerializers(),
    );
  }
  public async registerContract(
    userData: any,
  ): Promise<EntitiesRegisterContract[]> {
    return await this.post<EntitiesRegisterContract>(
      '/registerContract',
      userData,
      new MockRegisterContractSerializers(),
    );
  }
  public async updateContract(
    userData: any,
  ): Promise<EntitiesRegisterContract[]> {
    return await this.post<EntitiesRegisterContract>(
      '/updateContract',
      userData,
      new MockRegisterContractSerializers(),
    );
  }
  public async deleteUser(userId: any): Promise<EntitiesDeletUser[]> {
    return await this.post<EntitiesDeletUser>(
      '/deleteUser',
      userId,
      new MockDeleteUserSerializers(),
    );
  }

  public async deleteContract(id_contrato: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/deleteContract',
      id_contrato,
      new MockDeleteContratoSerializers(),
    );
  }
  public async deleteEntidadeEscolar(
    id_escola: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/deleteEntidadeEscolar',
      id_escola,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async findOneUser(userId: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/findOneUser',
      userId,
      new MockOneUserSerializers(),
    );
  }

  public async getEntitadeEscolar(
    id: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/findEntidadeEscolar',
      id,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async updateEntitadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/updateEscola',
      userData,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async getEntitadesEscolares(
    id_contrato: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/findEntidadesEscolares',
      id_contrato,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async userLogin(userData: any): Promise<EntitiesUserLogin[]> {
    return await this.post<EntitiesUserLogin>(
      '/login',
      userData,
      new MockUserLogin(),
    );
  }

  public async cadastroUser(userData: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/cadastroUser',
      userData,
      new MockCadastroSerializers(),
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

  private async get<T>(
    route: string,
    serializer: SerializerInterface,
  ): Promise<T[]> {
    const response = await this.api.get(route);
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
