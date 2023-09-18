import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { BiCloudDownload } from 'react-icons/bi';
import { IconType, IconBaseProps } from 'react-icons';
import { useGlobalContext } from '@/context/store';
import { EntitiesUsuariosPDG } from '@/entities';
import error from 'next/error';

interface pageContratosProps {}

interface FormData {
  id: string | null;
  nome_operacional: string | null;
  cnpj_escola: string | null;
  cep: string | null;
  endereco: string | null;
  cidade: string | null;
  uf: string | null;
  bairro: string | null;
  complemento: string | null;
  url_dados: string | null;
  uuid_ec: string | null;
  id_usuario_pdg: string | null;
  ativo: boolean | null;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
export default function EditEntidade(props: pageContratosProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idContrato, setPage } = useGlobalContext();
  const [userPDG, setUserPDG] = useState<EntitiesUsuariosPDG[]>([]);
  const [formData, setFormData] = useState<FormData>({
    id: '',
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
  useEffect(() => {
    fetchDataInitial();
  }, []);

  async function fetchDataInitial() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);
      const response = await backendApi.localizarEntitadeEscolar({
        id: idContrato,
      });
      const responseUserPdg = await backendApi.localizarUsuariosPDG();
      setUserPDG(responseUserPdg);

      setFormData({
        id: idContrato,
        nome_operacional: response[0]?.nome_operacional || '',
        cnpj_escola: response[0].cnpj_escola || '',
        cep: response[0]?.cep || '',
        endereco: response[0]?.endereco || '',
        cidade: response[0]?.cidade || '',
        uf: response[0]?.uf || '',
        bairro: response[0]?.bairro || '',
        complemento: response[0]?.complemento || '',
        url_dados: response[0]?.url_dados || '',
        uuid_ec: response[0]?.uuid_ec || '',
        id_usuario_pdg: response[0]?.id_usuario_pdg || '',
        ativo: response[0]?.ativo || null,
      });
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        setMsgError('resre');
        throw error;
      }
    }
  }

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.editarEntidadeEscolar({
        id: idContrato,
        nome_operacional: formData.nome_operacional,
        cnpj_escola: formData.cnpj_escola,
        cep: formData.cep,
        endereco: formData.endereco,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        complemento: formData.complemento,
        url_dados: formData.url_dados,
        id_usuario_pdg: formData.id_usuario_pdg,
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
    setPage(PageEnumContratos.entidadesEscolares);
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.nome_operacional === '' ||
      formData.cnpj_escola == '' ||
      formData.cep == '' ||
      formData.endereco == '' ||
      formData.cidade == '' ||
      formData.uf == '' ||
      formData.bairro == '' ||
      formData.complemento == '' ||
      formData.url_dados == '' ||
      formData.id_usuario_pdg == '' ||
      formData.ativo == null
    ) {
      setMsgError('Todos campos são obrigatórios...');
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    } else {
      fetchData();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h4>Editar Entidade Escolar</h4>

      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
          />
        </div>

        <form className={styles.boxForm} onSubmit={handleSubmit}>
          <label className={styles.labelStandard}>
            Nome Operacional
            <input
              type="text"
              placeholder="Nome Operacional"
              name="nome_operacional"
              value={formData.nome_operacional ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Responsavel Pedagógico
            <select
              value={formData.id_usuario_pdg ?? ''}
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
              value={formData.cnpj_escola ?? ''}
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
              value={formData.cep ?? ''}
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
              value={formData.endereco ?? ''}
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
              value={formData.cidade ?? ''}
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
              value={formData.uf ?? ''}
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
              value={formData.bairro ?? ''}
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
              value={formData.complemento ?? ''}
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
              value={formData.url_dados ?? ''}
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
              onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
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
