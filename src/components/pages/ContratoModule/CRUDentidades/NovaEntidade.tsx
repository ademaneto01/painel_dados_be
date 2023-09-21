import React, {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { BiCloudDownload } from 'react-icons/bi';
import { IconType, IconBaseProps } from 'react-icons';
import { EntitiesUsuariosPDG } from '@/entities';

interface pageContratosProps {
  setPage: Dispatch<SetStateAction<PageEnumContratos>>;
  setIdContrato: Dispatch<SetStateAction<string>>;
  idContrato: string;
}

interface FormData {
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  url_dados: string;
  uuid_ec: string;
  id_usuario_pdg: string;
  ativo: boolean | null;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
export default function NovaEntidade(props: pageContratosProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [userPDG, setUserPDG] = useState<EntitiesUsuariosPDG[]>([]);

  const [formData, setFormData] = useState<FormData>({
    nome_operacional: '',
    cnpj_escola: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
    url_dados: '',
    uuid_ec: '',
    id_usuario_pdg: '',
    ativo: true,
  });

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.registrarEntidadeEscolar({
        nome_operacional: formData.nome_operacional,
        cnpj_escola: formData.cnpj_escola,
        cep: formData.cep,
        endereco: formData.endereco,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        complemento: formData.complemento,
        url_dados: formData.url_dados,
        uuid_ec: props.idContrato,
        id_usuario_pg: formData.id_usuario_pdg,
        ativo: formData.ativo,
      });
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        throw error;
      }
    } finally {
      setLoaded(true);
    }
    props.setPage(PageEnumContratos.entidadesEscolares);
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'ativo') {
      const booleanValue =
        value === 'true' ? true : value === 'false' ? false : null;
      setFormData((prevState) => ({
        ...prevState,
        [name]: booleanValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.nome_operacional == '' ||
      formData.cnpj_escola == '' ||
      formData.cep == '' ||
      formData.endereco == '' ||
      formData.cidade == '' ||
      formData.uf == '' ||
      formData.bairro == '' ||
      formData.complemento == '' ||
      formData.url_dados == '' ||
      formData.ativo == null
    ) {
      setError(true);
      setMsgError('Todos campos são obrigatórios...');
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    } else if (formData.uf.length > 2) {
      setError(true);
      setMsgError('Campo UF é permitido somente dois caracteres...');
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    findUsersPDG();
  }, []);

  async function findUsersPDG() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);
      const response = await backendApi.localizarUsuariosPDG();
      setUserPDG(response);
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        throw error;
      }
    }
  }

  return (
    <div className={styles.pageContainer}>
      <h4>Nova Entidade</h4>

      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => props.setPage(PageEnumContratos.entidadesEscolares)}
          />
        </div>

        <form className={styles.boxForm} onSubmit={handleSubmit}>
          <label className={styles.labelStandard}>
            Nome Operacional
            <input
              type="text"
              placeholder="Nome Operacional"
              name="nome_operacional"
              value={formData.nome_operacional}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Responsavel Pedagógico
            <select
              value={formData.id_usuario_pdg}
              onChange={handleInputChange}
              name="id_usuario_pdg"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              {userPDG.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nome}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.labelStandard}>
            CNPJ Escola
            <input
              type="text"
              placeholder="CNPJ Escola"
              name="cnpj_escola"
              value={formData.cnpj_escola}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            CEP
            <input
              type="text"
              placeholder="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Endereço
            <input
              type="text"
              placeholder="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Cidade
            <input
              type="text"
              placeholder="Cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            UF
            <input
              type="text"
              placeholder="UF"
              name="uf"
              value={formData.uf}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Bairro
            <input
              type="text"
              placeholder="Bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Complemento
            <input
              type="text"
              placeholder="Complemente"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            URL Dados
            <input
              type="text"
              placeholder="url_dados"
              name="url_dados"
              value={formData.url_dados}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Status
            <select
              value={formData.ativo === null ? '' : formData.ativo.toString()}
              onChange={handleInputChange}
              name="ativo"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </label>

          <div className={styles.buttonContainer}>
            <button
              className={styles.confirmButton}
              type="button"
              onClick={handleSubmit}
            >
              Salvar
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() =>
                props.setPage(PageEnumContratos.entidadesContratuais)
              }
            >
              Cancelar
            </button>
          </div>
        </form>
        {error ? <ErrorComponent message={msgError} /> : ''}
      </PageContentContainer>
    </div>
  );
}
