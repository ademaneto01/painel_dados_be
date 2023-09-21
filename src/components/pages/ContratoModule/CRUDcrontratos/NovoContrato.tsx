import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface PageContratosProps {
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}

interface FormData {
  nome_simplificado: string;
  razao_social: string;
  cnpj_cont: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  ativo: boolean | null;
  bo_rede: boolean | null;
}

export default function NovoContrato(props: PageContratosProps): JSX.Element {
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

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage } = useGlobalContext();

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
      await backendApi.registrarContrato(formData);
      props.setPage(PageEnumContratos.entidadesContratuais);
    } catch (error) {
      handleApiErrors(error);
    }
    setPage(PageEnumContratos.entidadesContratuais);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['ativo', 'bo_rede'].includes(name)
      ? booleanValue
      : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (Object.values(formData).some((v) => v === '' || v === null)) {
      errors.push('Todos campos são obrigatórios...');
    }
    if (formData.uf.length > 2) {
      errors.push('Campo UF é permitido somente dois caracteres...');
    }
    if (errors.length) {
      setError(true);
      setMsgError(errors.join(' '));
      setTimeout(() => setError(false), 6000);
      return false;
    }
    return true;
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
        <NavigationButtons setPage={props.setPage} />
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

const HeaderComponent: React.FC = () => <h4>Novo Contrato</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
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
          value={formData.nome_simplificado}
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
          value={formData.razao_social}
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
          value={formData.cnpj_cont}
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
