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

  public async localizarUsuarios(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuarios',
      new MockUsersSerializers(),
    );
  }

  public async getUsersPDG(): Promise<EntitiesUsersPDG[]> {
    return await this.get<EntitiesUsersPDG>(
      '/findUsersPDG',
      new MockUsersPDG(),
    );
  }

  public async todasEntidadesEscolares(): Promise<
    EntitiesEntidadesEscolares[]
  > {
    return await this.get<EntitiesEntidadesEscolares>(
      '/todasEntidadesEscolares',
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async localizarContratos(): Promise<EntitiesContratos[]> {
    return await this.get<EntitiesContratos>(
      '/localizarContratos',
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
  public async editarUsuario(userData: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/editarUsuario',
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
  public async deletarUsuario(userId: any): Promise<EntitiesDeletUser[]> {
    return await this.post<EntitiesDeletUser>(
      '/deletarUsuario',
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
  public async localizarUsuario(userId: any): Promise<EntitiesUsers[]> {
    return await this.post<EntitiesUsers>(
      '/localizarUsuario',
      userId,
      new MockUsersSerializers(),
    );
  }

  public async localizarEntitadeEscolar(
    id: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/localizarEntidadeEscolar',
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
  public async localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/localizarEntidadesEscolares',
      uuid_ec,
      new MockEntidadesEscolaresSerializers(),
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
