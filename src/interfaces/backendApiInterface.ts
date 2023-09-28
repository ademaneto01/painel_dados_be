import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesDeletUser,
  EntitiesUrl,
  EntitiesContratos,
  EntitiesEntidadesEscolares,
  EntitiesUsuariosPDG,
  EntitiesRegistrarEntidadeEscolar,
  EntitiesCadastroUser,
  EntitiesEditarEntidadeEscolar,
  EntitiesEntidadesEscolaresPDG,
  EntitiesAgenteExterno,
} from '@/entities';
import EntitiesVincularAgente from '@/entities/EntitiesVincularAgente';

export default interface BackendApiInterface {
  localizarUsuarios(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;
  deletarUsuario(userId: any): Promise<EntitiesDeletUser[]>;
  localizarUsuario(userId: any): Promise<EntitiesUsers[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  registrarUsuario(userData: any): Promise<EntitiesCadastroUser[]>;
  localizarContratos(): Promise<EntitiesContratos[]>;
  todasEntidadesEscolares(): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntidadesEscolaresUsuariosPDG(
    userId: any,
  ): Promise<EntitiesEntidadesEscolaresPDG[]>;

  localizarEntidadesEscolares(
    uuid_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]>;
  localizarEntitadeEscolar(id: any): Promise<EntitiesEditarEntidadeEscolar[]>;
  registrarEntidadeEscolar(
    userData: any,
  ): Promise<EntitiesRegistrarEntidadeEscolar[]>;
  registrarContrato(userData: any): Promise<EntitiesContratos[]>;
  deletarContrato(uuid_ec: any): Promise<EntitiesContratos[]>;
  sobrescreverContrato(userData: any): Promise<EntitiesContratos[]>;
  localizarUsuariosPDG(): Promise<EntitiesUsuariosPDG[]>;
  localizarContrato(id: any): Promise<EntitiesContratos[]>;
  deletarEntidadeEscolar(id: any): Promise<EntitiesEntidadesEscolares[]>;
  listarAgenteRelacionadoEscola(id_ee: any): Promise<EntitiesAgenteExterno[]>;
  listarTodosAgentes(): Promise<EntitiesAgenteExterno[]>;
  vincularAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  deletarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  localizarAgenteId(id: any): Promise<EntitiesAgenteExterno[]>;
  listarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
  editarVinculoAgente(userData: any): Promise<EntitiesVincularAgente[]>;
}
