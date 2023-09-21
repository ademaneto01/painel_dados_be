import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

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
  ativo: boolean | null;
  bo_rede: boolean | null;
}

export default function EditContrato(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idContrato, setPage } = useGlobalContext();
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
    ativo: null,
    bo_rede: null,
  });

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const fetchDataInitial = async () => {
    const response = await fetchContractData(idContrato);
    if (response) {
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
        ativo: response[0]?.ativo || null,
        bo_rede: response[0]?.bo_rede || null,
      });
    }
  };

  const fetchContractData = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);
      return await backendApi.localizarContrato({ id });
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const handleApiErrors = (error: any) => {
    if (error instanceof FailedToFetchError) {
      setError(true);
    } else {
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);
      await backendApi.editarEntidadeContratual({
        id: idContrato,
        nome_simplificado: formData.nome_simplificado,
        razao_social: formData.razao_social,
        cnpj_cont: formData.cnpj_cont,
        cep: formData.cep,
        endereco: formData.endereco,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        complemento: formData.complemento,
        ativo: formData.ativo,
        bo_rede: formData.bo_rede,
      });
    } catch (error) {
      handleApiErrors(error);
    } finally {
      setLoaded(true);
    }
    setPage(PageEnumContratos.entidadesContratuais);
  };

  const validateForm = () => {
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
      formData.ativo == null ||
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
      return true;
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'ativo' || name === 'bo_rede') {
      const booleanValue =
        value === 'true' ? true : value === 'false' ? false : null;
      setFormData((prevState) => ({ ...prevState, [name]: booleanValue }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      fetchData();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Editar Contrato</h4>;

const NavigationButtons: React.FC<any> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <CreateButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  setPage,
}) => {
  return (
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
      <label className={styles.labelStandard}>
        Rede
        <select
          value={formData.bo_rede === null ? '' : formData.bo_rede.toString()}
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
  );
};
