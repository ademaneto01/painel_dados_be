import { FailedToFetchError } from '@/errors';
import { BackendApiInterfaceDelete } from '@/interfaces';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiDelete implements BackendApiInterfaceDelete {
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

  public async deletarDocEntidade(id: any): Promise<string> {
    return await this.delete<string>('/deletarDocEntidade', id);
  }

  public async deletarDocContrato(id: any): Promise<string> {
    return await this.delete<string>('/deletarDocContrato', id);
  }

  public async deletarUsuario(userId: any): Promise<string> {
    return await this.delete<string>('/deletarUsuario', userId);
  }

  public async deletarContrato(uuid_ec: any): Promise<string> {
    return await this.delete<string>('/deletarContrato', uuid_ec);
  }
  public async deletarEntidadeEscolar(id: any): Promise<string> {
    return await this.delete<string>('/deletarEntidadeEscolar', id);
  }

  public async deletarAgente(userId: any): Promise<string> {
    return await this.delete<string>('/deletarAgente', userId);
  }

  public async deletarVinculoAgente(userData: any): Promise<string> {
    return await this.delete<string>('/deletarVinculoAgente', userData);
  }

  public async deletarInfosContrato(id: any): Promise<string> {
    return await this.delete<string>('/deletarInfosContrato', id);
  }

  private async delete<T>(route: string, data: any): Promise<T> {
    const response = await this.api.delete(route, { data });

    return this.serializeOrError<T>(response);
  }

  private serializeOrError<T>(response: AxiosResponse): T {
    if (response.status === 204 || response.status === 200) {
      return response.data.mensagem;
    } else {
      throw new FailedToFetchError();
    }
  }
}
