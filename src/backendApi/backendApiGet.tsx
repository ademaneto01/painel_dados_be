import {
  EntitiesVinculosAgentesExterno,
  EntitiesContratos,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolares,
  EntitiesEntidadesEscolaresPDG,
  EntitiesInfosContrato,
  EntitiesUrl,
  EntitiesUsers,
  EntitiesUsuariosPDG,
  EntitiesVincularAgente,
  EntitiesTeste,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfaceGet, SerializerInterface } from '@/interfaces';
import {
  MockUsersSerializers,
  MockUrlSerializers,
  MockUsuariosPDG,
  MockEntidadeEscolarPDGSerializers,
  MockTeste,
  MockDocsContrato,
  MockDocsEntitade,
  MockAgenteExternoVinculo,
  MockEditarEntidadeEscolar,
  MockContratosSerializers,
  MockEntidadesEscolaresSerializers,
  MockInfosContrato,
} from '@/serializers/mocks';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiGet implements BackendApiInterfaceGet {
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

  public async localizarUsuarios(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuarios',
      new MockUsersSerializers(),
    );
  }

  public async localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]> {
    return await this.get<EntitiesUsuariosPDG>(
      '/localizarUsuariosPDG',
      new MockUsuariosPDG(),
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
    return await this.get<EntitiesUrl>(
      '/findDadosUser',

      new MockUrlSerializers(),
      { id: userId },
    );
  }

  public async localizarContrato(id: any): Promise<EntitiesContratos[]> {
    return await this.get<EntitiesContratos>(
      '/localizarContrato',

      new MockContratosSerializers(),
      { id },
    );
  }

  public async listarDocsContrato(
    idContrato: any,
  ): Promise<EntitiesDocsContrato[]> {
    return await this.get<EntitiesDocsContrato>(
      '/listarDocsContrato',

      new MockDocsContrato(),
      { id: idContrato },
    );
  }

  public async listarDocsEntidade(
    uuid_ee: any,
  ): Promise<EntitiesDocsEntidade[]> {
    return await this.get<EntitiesDocsEntidade>(
      '/listarDocsEntidade',

      new MockDocsEntitade(),
      { id: uuid_ee },
    );
  }

  public async localizarUsuario(userId: any): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuario',

      new MockUsersSerializers(),
      { id: userId },
    );
  }
  public async listarInfosContrato(
    uuid_ec: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.get<EntitiesInfosContrato>(
      '/listarInfosContrato',

      new MockInfosContrato(),
      { id: uuid_ec },
    );
  }

  public async localizarEntidadeEscolar(
    id: any,
  ): Promise<EntitiesEditarEntidadeEscolar[]> {
    return await this.get<EntitiesEditarEntidadeEscolar>(
      '/localizarEntidadeEscolar',
      new MockEditarEntidadeEscolar(),
      { id },
    );
  }
  public async listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]> {
    return await this.get<EntitiesVinculosAgentesExterno>(
      '/ListarAgentesRelacionadoEscola',

      new MockAgenteExternoVinculo(),
      { id: id_ee },
    );
  }

  public async listarTodosAgentes(): Promise<EntitiesTeste[]> {
    return await this.get<EntitiesTeste>(
      '/listarTodosAgentes',
      new MockTeste(),
    );
  }

  public async localizarAgenteId(id: any): Promise<EntitiesTeste[]> {
    return await this.get<EntitiesTeste>(
      '/localizarAgenteId',

      new MockTeste(),
      { id },
    );
  }

  public async localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]> {
    return await this.get<EntitiesEntidadesEscolaresPDG>(
      '/localizarEntidadesEscolaresUsuariosPDG',

      new MockEntidadeEscolarPDGSerializers(),
      { id: userId },
    );
  }

  public async localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.get<EntitiesEntidadesEscolares>(
      '/localizarEntidadesEscolares',
      new MockEntidadesEscolaresSerializers(),
      { id: uuid_ec },
    );
  }
  public async localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]> {
    return await this.get<EntitiesUrl>(
      '/localizarUrlPainel',
      new MockUrlSerializers(),
      { id: id_ee },
    );
  }

  private async get<T>(
    route: string,
    serializer: SerializerInterface,
    data?: any,
  ): Promise<T[]> {
    let response: AxiosResponse;

    try {
      response = data
        ? await this.api.get(`${route}?id=${data.id}`)
        : await this.api.get(route);
      return this.serializeOrError<T>(response, serializer);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new FailedToFetchError();
    }
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
