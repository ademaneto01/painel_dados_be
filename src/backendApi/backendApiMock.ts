import {
    Escolas,
    Lessons,
    Users
  } from "@/entities";
  import { FailedToFetchError } from "@/errors";
  import { BackendApiInterface, SerializerInterface } from "@/interfaces";

  import {
    MockEscolasSerializers,
    MockLessonsSerializers,
    MockUsersSerializers
  } from "@/serializers/mocks";
  import axios, { AxiosInstance, AxiosResponse } from "axios";

  export default class BackendApiMock implements BackendApiInterface {
    private api: AxiosInstance;

    constructor() {
      this.api = axios.create({
        baseURL: "http://localhost:3001",
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    public async getEscolas(): Promise<Escolas[]> {
      return await this.get<Escolas>(
        "/escolas",
        new MockEscolasSerializers()
      );
    }
    public async getLessons(): Promise<Lessons[]> {
      return await this.get<Lessons>(
        "/resources",
        new MockLessonsSerializers()
      );
    }
    public async getUsers(): Promise<Users[]> {
      return await this.get<Users>(
        "/users",
        new MockUsersSerializers()
      );
    }
    private async get<T>(
      route: string,
      serializer: SerializerInterface
    ): Promise<T[]> {
      const response = await this.api.get(route);
      return this.serializeOrError<T>(response, serializer);
    }

    private serializeOrError<T>(
      response: AxiosResponse,
      serializer: SerializerInterface
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
