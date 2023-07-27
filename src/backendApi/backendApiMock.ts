import {
  EntitiesSchool,
  EntitiesDocumentation,
  EntitiesUsers,
  EntitiesMaterials,
  EntitiesLessons,
  EntitiesTeacherGuides,
  EntitiesClassPlan,
  EntitiesUnits,
  EntitiesTurmas,
  EntitiesAlunos,
  EntitiesProfessores,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterface, SerializerInterface } from '@/interfaces';

import {
  MockSchoolSerializers,
  MockDocumentationSerializers,
  MockUsersSerializers,
  MockMaterialsSerializers,
  MockLessonsSerializers,
  MockTeacherGuidesSerializers,
  MockClassPanSerializers,
  MockUnitsSerializers,
  MockTurmasSerializers,
  MockProfessoresSerializers,
} from '@/serializers/mocks';
import MockAlunosSerializers from '@/serializers/mocks/mockAlunosSerializers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiMock implements BackendApiInterface {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://mockapibe.onrender.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getSchools(): Promise<EntitiesSchool[]> {
    return await this.get<EntitiesSchool>(
      '/escolas',
      new MockSchoolSerializers(),
    );
  }
  public async getDocumentation(): Promise<EntitiesDocumentation[]> {
    return await this.get<EntitiesDocumentation>(
      '/resources',
      new MockDocumentationSerializers(),
    );
  }
  public async getUsers(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>('/users', new MockUsersSerializers());
  }
  public async getMaterials(): Promise<EntitiesMaterials[]> {
    return await this.get<EntitiesMaterials>(
      '/materials',
      new MockMaterialsSerializers(),
    );
  }
  public async getLessons(): Promise<EntitiesLessons[]> {
    return await this.get<EntitiesLessons>(
      '/lessonplans',
      new MockLessonsSerializers(),
    );
  }
  public async getTeacherGuides(): Promise<EntitiesTeacherGuides[]> {
    return await this.get<EntitiesTeacherGuides>(
      '/teacherGuides',
      new MockTeacherGuidesSerializers(),
    );
  }
  public async getClassPlans(): Promise<EntitiesClassPlan[]> {
    return await this.get<EntitiesClassPlan>(
      '/classPlans',
      new MockClassPanSerializers(),
    );
  }
  public async getUnits(): Promise<EntitiesUnits[]> {
    return await this.get<EntitiesUnits>('/units', new MockUnitsSerializers());
  }
  public async getTurmas(): Promise<EntitiesTurmas[]> {
    return await this.get<EntitiesTurmas>(
      '/turmas',
      new MockTurmasSerializers(),
    );
  }
  public async getAlunos(): Promise<EntitiesAlunos[]> {
    return await this.get<EntitiesAlunos>(
      '/alunos',
      new MockAlunosSerializers(),
    );
  }
  public async getProfessores(): Promise<EntitiesProfessores[]> {
    return await this.get<EntitiesProfessores>(
      '/professores',
      new MockProfessoresSerializers(),
    );
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
