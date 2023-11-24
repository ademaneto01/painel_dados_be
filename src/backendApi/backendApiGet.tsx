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
  EntitiesAgenteExterno,
  EntitiesAlunados,
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfaceGet, SerializerInterface } from '@/interfaces';
import {
  UsersSerializers,
  UrlSerializers,
  UsuariosPDGSerializers,
  EntidadeEscolarPDGSerializers,
  AgenteExternoSerializers,
  DocsContratoSerializers,
  DocsEntitadeSerializers,
  AgenteExternoVinculoSerializers,
  EditarEntidadeEscolarSerializers,
  ContratosSerializers,
  EntidadesEscolaresSerializers,
  InfosContratoSerializers,
  AlunadosSerializers,
} from '@/serializers/prod';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiGet implements BackendApiInterfaceGet {
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

  public async localizarUsuarios(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuarios',
      new UsersSerializers(),
    );
  }

  public async localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]> {
    return await this.get<EntitiesUsuariosPDG>(
      '/localizarUsuariosPDG',
      new UsuariosPDGSerializers(),
    );
  }

  public async todasEntidadesEscolares(): Promise<
    EntitiesEntidadesEscolares[]
  > {
    return await this.get<EntitiesEntidadesEscolares>(
      '/todasEntidadesEscolares',
      new EntidadesEscolaresSerializers(),
    );
  }
  public async localizarContratos(): Promise<EntitiesContratos[]> {
    return await this.get<EntitiesContratos>(
      '/localizarContratos',
      new ContratosSerializers(),
    );
  }
  public async getUrl(userId: any): Promise<EntitiesUrl[]> {
    return await this.get<EntitiesUrl>(
      '/findDadosUser',

      new UrlSerializers(),
      { id: userId },
    );
  }

  public async localizarContrato(id: any): Promise<EntitiesContratos[]> {
    return await this.get<EntitiesContratos>(
      '/localizarContrato',

      new ContratosSerializers(),
      { id },
    );
  }

  public async listarDocsContrato(
    idContrato: any,
  ): Promise<EntitiesDocsContrato[]> {
    return await this.get<EntitiesDocsContrato>(
      '/listarDocsContrato',

      new DocsContratoSerializers(),
      { id: idContrato },
    );
  }

  public async listarDocsEntidade(
    idEntidadeEscolar: any,
  ): Promise<EntitiesDocsEntidade[]> {
    return await this.get<EntitiesDocsEntidade>(
      '/listarDocsEntidade',

      new DocsEntitadeSerializers(),
      { id: idEntidadeEscolar },
    );
  }

  public async localizarUsuario(userId: any): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuario',

      new UsersSerializers(),
      { id: userId },
    );
  }
  public async listarInfosContrato(
    uuid_ec: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.get<EntitiesInfosContrato>(
      '/listarInfosContrato',

      new InfosContratoSerializers(),
      { id: uuid_ec },
    );
  }

  public async localizarEntidadeEscolar(
    id: any,
  ): Promise<EntitiesEditarEntidadeEscolar[]> {
    return await this.get<EntitiesEditarEntidadeEscolar>(
      '/localizarEntidadeEscolar',
      new EditarEntidadeEscolarSerializers(),
      { id },
    );
  }
  public async listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]> {
    return await this.get<EntitiesVinculosAgentesExterno>(
      '/ListarAgentesRelacionadoEscola',

      new AgenteExternoVinculoSerializers(),
      { id: id_ee },
    );
  }

  public async listarTodosAgentes(): Promise<EntitiesAgenteExterno[]> {
    return await this.get<EntitiesAgenteExterno>(
      '/listarTodosAgentes',
      new AgenteExternoSerializers(),
    );
  }

  public async localizarAgenteId(id: any): Promise<EntitiesAgenteExterno[]> {
    return await this.get<EntitiesAgenteExterno>(
      '/localizarAgenteId',

      new AgenteExternoSerializers(),
      { id },
    );
  }

  public async localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]> {
    return await this.get<EntitiesEntidadesEscolaresPDG>(
      '/localizarEntidadesEscolaresUsuariosPDG',

      new EntidadeEscolarPDGSerializers(),
      { id: userId },
    );
  }

  public async localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.get<EntitiesEntidadesEscolares>(
      '/localizarEntidadesEscolares',
      new EntidadesEscolaresSerializers(),
      { id: uuid_ec },
    );
  }
  public async localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]> {
    return await this.get<EntitiesUrl>(
      '/localizarUrlPainel',
      new UrlSerializers(),
      { id: id_ee },
    );
  }

  public async listarIndividualTurmas(data: any): Promise<EntitiesAlunados[]> {
    return await this.get<EntitiesAlunados>(
      '/listarIndividualTurmas',
      new AlunadosSerializers(),
      { id: data },
    );
  }
  public async listarIndividualAlunados(
    data: any,
  ): Promise<EntitiesAlunados[]> {
    return await this.get<EntitiesAlunados>(
      '/listarIndividualAlunados',
      new AlunadosSerializers(),
      { id: data },
    );
  }

  private async get<T>(
    route: string,
    serializer: SerializerInterface,
    data?: any,
  ): Promise<T[]> {
    let response: AxiosResponse;

    response = data
      ? await this.api.get(
          `${route}?id=${
            route === '/listarIndividualAlunados' ||
            route === '/listarIndividualTurmas'
              ? JSON.stringify(data.id)
              : data.id
          }`,
        )
      : await this.api.get(route);
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
