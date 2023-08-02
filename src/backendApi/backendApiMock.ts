import {
  EntitiesDeletUser,
  EntitiesOneUser,
  EntitiesUserLogin,
  EntitiesUsers,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterface, SerializerInterface } from '@/interfaces';
import {
  MockUserLogin,
  MockUsersSerializers,
  MockOneUserSerializers,
  MockDeleteUserSerializers,
  MockCadastroSerializers,
} from '@/serializers/mocks';

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
  public async deleteUser(userId: any): Promise<EntitiesDeletUser[]> {
    return await this.post<EntitiesDeletUser>(
      '/deleteUser',
      userId,
      new MockDeleteUserSerializers(),
    );
  }
  public async findOneUser(userId: any): Promise<EntitiesOneUser[]> {
    return await this.post<EntitiesOneUser>(
      '/findOneUser',
      userId,
      new MockOneUserSerializers(),
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
