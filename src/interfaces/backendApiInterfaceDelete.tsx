export default interface BackendApiInterfaceDelete {
  deletarUsuario(userId: any): Promise<string>;
  deletarContrato(uuid_ec: any): Promise<string>;
  deletarEntidadeEscolar(id: any): Promise<string>;
  deletarVinculoAgente(userData: any): Promise<string>;
  deletarAgente(userId: any): Promise<string>;
  deletarDocContrato(id: any): Promise<string>;
  deletarDocEntidade(id: any): Promise<string>;
  deletarInfosContrato(id: any): Promise<string>;
  deletarAlunado(userData: any): Promise<string>;
  deletarAcompanhamento(id: any): Promise<string>;
}
