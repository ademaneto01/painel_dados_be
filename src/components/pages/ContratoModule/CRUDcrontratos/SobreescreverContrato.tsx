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
import { useGlobalContext } from '@/context/store';

interface pageContratosProps {
  setPage: Dispatch<SetStateAction<PageEnumContratos>>;
  setIdContrato: Dispatch<SetStateAction<string>>;
}

interface FormData {
  nome_simplificado: string | null;
  razao_social: string | null;
  cnpj_cont: string | null;
  cep: string | null;
  endereco: string | null;
  cidade: string | null;
  uf: string;
  bairro: string | null;
  complemento: string | null;
  bo_rede: boolean | null;
}

export default function SobreescreverContrato(
  props: pageContratosProps,
): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { idContrato, setPage } = useGlobalContext();
  const [msgError, setMsgError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    nome_simplificado: '',
    razao_social: '',
    cnpj_cont: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
    bo_rede: null,
  });

  useEffect(() => {
    fetchDataInitial();
  }, []);

  async function fetchDataInitial() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);
      const response = await backendApi.localizarContrato({ id: idContrato });

      setFormData({
        nome_simplificado: response[0]?.nome_simplificado || '',
        razao_social: response[0]?.razao_social || '',
        cnpj_cont: response[0]?.cnpj_cont || '',
        cep: response[0]?.cep || '',
        endereco: response[0]?.endereco || '',
        cidade: response[0]?.cidade || '',
        uf: response[0]?.uf || '',
        bairro: response[0]?.bairro || '',
        complemento: response[0]?.complemento || '',
        bo_rede: response[0]?.bo_rede || null,
      });
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        throw error;
      }
    }
  }
  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.sobrescreverContrato({
        uuid_ec: idContrato,
        nome_simplificado: formData.nome_simplificado,
        razao_social: formData.razao_social,
        cnpj_cont: formData.cnpj_cont,
        cep: formData.cep,
        endereco: formData.endereco,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        complemento: formData.complemento,
        bo_rede: formData.bo_rede,
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
    props.setPage(PageEnumContratos.entidadesContratuais);
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'bo_rede') {
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
      formData.nome_simplificado === '' ||
      formData.razao_social == '' ||
      formData.cnpj_cont == '' ||
      formData.cep == '' ||
      formData.endereco == '' ||
      formData.cidade == '' ||
      formData.uf == '' ||
      formData.bairro == '' ||
      formData.complemento == '' ||
      formData.bo_rede == null
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

  return (
    <div className={styles.pageContainer}>
      <h4>Sobrescrever Contrato</h4>

      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>

        <form className={styles.boxForm} onSubmit={handleSubmit}>
          <label className={styles.labelStandard}>
            Nome Simplificado
            <input
              type="text"
              placeholder="Nome Simplificado"
              name="nome_simplificado"
              value={formData.nome_simplificado ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Razão Social
            <input
              type="text"
              placeholder="Razão Sociala"
              name="razao_social"
              value={formData.razao_social ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            CNPJ
            <input
              type="text"
              placeholder="CNPJ"
              name="cnpj_cont"
              value={formData.cnpj_cont ?? ''}
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
            Rede
            <select
              value={
                formData.bo_rede === null ? '' : formData.bo_rede.toString()
              }
              onChange={handleInputChange}
              name="bo_rede"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              <option value="true">Ativa</option>
              <option value="false">Inativa</option>
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
              onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
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
