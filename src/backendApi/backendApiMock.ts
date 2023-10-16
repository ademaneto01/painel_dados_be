import {
  EntitiesVinculosAgentesExterno,
  EntitiesContratos,
  EntitiesDeletUser,
  EntitiesDocsContrato,
  EntitiesDocsEntidade,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolares,
  EntitiesEntidadesEscolaresPDG,
  EntitiesInfosContrato,
  EntitiesOneUser,
  EntitiesRegistrarDocContrato,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesUrl,
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesUsuariosPDG,
  EntitiesVincularAgente,
  EntitiesTeste,
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
  MockDeleteContratoSerializers,
  MockRegistrarEntidadeEscolar,
  MockUsuariosPDG,
  MockEntidadeEscolarPDGSerializers,
  MockTeste,
  MockVincularAgente,
  MockRegistrarDocContrato,
  MockDocsContrato,
  MockDocsEntitade,
  MockAgenteExternoVinculo,
  MockEditarEntidadeEscolar,
  MockContratosSerializers,
  MockEntidadesEscolaresSerializers,
  MockInfosContrato,
} from '@/serializers/mocks';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiMock implements BackendApiInterface {
  private api: AxiosInstance;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || undefined;

    this.api = axios.create({
      baseURL: 'http://localhost:8080/api',
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
  public async registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]> {
    return await this.post<EntitiesRegistrarEntidadeEscolar>(
      '/registrarEntidadeEscolar',
      userData,
      new MockRegistrarEntidadeEscolar(),
    );
  }
  public async localizarContrato(id: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/localizarContrato',
      id,
      new MockContratosSerializers(),
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
  public async listarDocsContrato(
    uuid_ec: any,
  ): Promise<EntitiesDocsContrato[]> {
    return await this.post<EntitiesDocsContrato>(
      '/listarDocsContrato',
      uuid_ec,
      new MockDocsContrato(),
    );
  }

  public async listarDocsEntidade(
    uuid_ee: any,
  ): Promise<EntitiesDocsEntidade[]> {
    return await this.post<EntitiesDocsEntidade>(
      '/listarDocsEntidade',
      uuid_ee,
      new MockDocsEntitade(),
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

  public async deletarDocEntidade(id: any): Promise<EntitiesDocsEntidade[]> {
    return await this.post<EntitiesDocsEntidade>(
      '/deletarDocEntidade',
      id,
      new MockDocsEntitade(),
    );
  }

  public async deletarDocContrato(id: any): Promise<EntitiesDocsContrato[]> {
    return await this.post<EntitiesDocsContrato>(
      '/deletarDocContrato',
      id,
      new MockDocsContrato(),
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
  public async registrarContrato(userData: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/registrarEntidadeContratual',
      userData,
      new MockContratosSerializers(),
    );
  }
  public async editarEntidadeContratual(
    userData: any,
  ): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/editarEntidadeContratual',
      userData,
      new MockContratosSerializers(),
    );
  }
  public async deletarUsuario(userId: any): Promise<EntitiesDeletUser[]> {
    return await this.post<EntitiesDeletUser>(
      '/deletarUsuario',
      userId,
      new MockDeleteUserSerializers(),
    );
  }

  public async deletarContrato(uuid_ec: any): Promise<EntitiesContratos[]> {
    return await this.post<EntitiesContratos>(
      '/deletarContrato',
      uuid_ec,
      new MockDeleteContratoSerializers(),
    );
  }
  public async deletarEntidadeEscolar(
    id: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/deletarEntidadeEscolar',
      id,
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
  public async listarInfosContrato(
    uuid_ec: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.post<EntitiesInfosContrato>(
      '/listarInfosContrato',
      uuid_ec,
      new MockInfosContrato(),
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

  public async localizarEntitadeEscolar(
    id: any,
  ): Promise<EntitiesEditarEntidadeEscolar[]> {
    return await this.post<EntitiesEditarEntidadeEscolar>(
      '/localizarEntidadeEscolar',
      id,
      new MockEditarEntidadeEscolar(),
    );
  }
  public async listarAgenteRelacionadoEscola(
    id_ee: any,
  ): Promise<EntitiesVinculosAgentesExterno[]> {
    return await this.post<EntitiesVinculosAgentesExterno>(
      '/ListarAgentesRelacionadoEscola',
      id_ee,
      new MockAgenteExternoVinculo(),
    );
  }

  public async listarTodosAgentes(): Promise<EntitiesTeste[]> {
    return await this.get<EntitiesTeste>(
      '/listarTodosAgentes',
      new MockTeste(),
    );
  }
  public async registrarAgente(userData: any): Promise<EntitiesTeste[]> {
    return await this.post<EntitiesTeste>(
      '/registrarAgente',
      userData,
      new MockTeste(),
    );
  }
  public async editarAgente(userData: any): Promise<EntitiesTeste[]> {
    return await this.post<EntitiesTeste>(
      '/editarAgente',
      userData,
      new MockTeste(),
    );
  }

  public async deletarAgente(userId: any): Promise<EntitiesTeste[]> {
    return await this.post<EntitiesTeste>(
      '/deletarAgente',
      userId,
      new MockTeste(),
    );
  }

  public async localizarAgenteId(id: any): Promise<EntitiesTeste[]> {
    return await this.post<EntitiesTeste>(
      '/localizarAgenteId',
      id,
      new MockTeste(),
    );
  }

  public async localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]> {
    return await this.post<EntitiesEntidadesEscolaresPDG>(
      '/localizarEntidadesEscolaresUsuariosPDG',
      userId,
      new MockEntidadeEscolarPDGSerializers(),
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
  public async deletarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/deletarVinculoAgente',
      userData,
      new MockVincularAgente(),
    );
  }
  public async editarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/editarEntidadeEscolar',
      userData,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async deletarInfosContrato(id: any): Promise<EntitiesInfosContrato[]> {
    return await this.post<EntitiesInfosContrato>(
      '/deletarInfosContrato',
      id,
      new MockInfosContrato(),
    );
  }
  public async editarInfosContrato(
    userData: any,
  ): Promise<EntitiesInfosContrato[]> {
    return await this.post<EntitiesInfosContrato>(
      '/editarInfosContrato',
      userData,
      new MockInfosContrato(),
    );
  }

  public async editarVinculoAgente(
    userData: any,
  ): Promise<EntitiesVincularAgente[]> {
    return await this.post<EntitiesVincularAgente>(
      '/editarVinculoAgente',
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
  public async localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.post<EntitiesEntidadesEscolares>(
      '/localizarEntidadesEscolares',
      uuid_ec,
      new MockEntidadesEscolaresSerializers(),
    );
  }
  public async localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]> {
    return await this.post<EntitiesUrl>(
      '/localizarUrlPainel',
      id_ee,
      new MockUrlSerializers(),
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
