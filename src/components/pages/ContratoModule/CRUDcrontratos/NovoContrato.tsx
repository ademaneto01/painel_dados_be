import React, { useState, ChangeEvent, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import styles from '@/styles/NovoContrato.module.css';
import { BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import validaCNPJ from '@/validations/validaCNPJ';

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
  // ativo: boolean | null;
  valorcontrato: string;
  tipocontrato: string;
  bo_rede: boolean | null;
}

export default function NovoContrato(): JSX.Element {
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
    tipocontrato: '',
    valorcontrato: '',
    // ativo: null,
    bo_rede: null,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage } = useGlobalContext();

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPost(`${token}`);
      await backendApi.registrarContrato(formData);
      setPage(PageEnumContratos.entidadesContratuais);
    } catch (error) {
      handleApiErrors(error);
    }
    setPage(PageEnumContratos.entidadesContratuais);
  };

  const fetchEndereco = async (cep: string) => {
    try {
      cep = cep.replace(/-/g, '');
      for (const validaCep of cep) {
        if (validaCep === '_') {
          return null;
        }
      }
      if (cep.length !== 8) {
        return null;
      }
      if (cep.length === 8) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: data.logradouro,
            cidade: data.localidade,
            uf: data.uf,
            bairro: data.bairro,
            complemento: data.complemento,
          }));
        } else {
          setError(true);
          setMsgError('CEP não encontrato...');
          setTimeout(() => setError(false), 5000);
        }
      }
    } catch (error) {
      setError(true);
      setMsgError('Erro ao buscar o CEP...');
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'cep') {
      fetchEndereco(value);
    }
    // ['ativo', 'bo_rede']
    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['bo_rede'].includes(name) ? booleanValue : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (Object.values(formData).some((v) => v === '' || v === null)) {
      errors.push('Informe os campos obrigatórios.');
    }
    if (formData.uf.length > 2) {
      errors.push('Campo UF é permitido somente dois caracteres...');
    }

    if (!validaCNPJ(formData.cnpj_cont)) {
      errors.push('CNPJ inválido...');
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

const HeaderComponent: React.FC = () => <h4>Novo Contrato</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
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
        Nome Simplificado*
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
        Razão Social*
        <input
          type="text"
          placeholder="Razão Social"
          name="razao_social"
          value={formData.razao_social}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        CNPJ*
        <InputMask
          type="text"
          mask="99.999.999/9999-99"
          placeholder="CNPJ"
          name="cnpj_cont"
          value={formData.cnpj_cont}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        CEP*
        <InputMask
          type="text"
          mask="99999-999"
          placeholder="CEP"
          name="cep"
          value={formData.cep}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Rua*
        <input
          type="text"
          placeholder="Rua"
          name="endereco"
          value={formData.endereco}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Cidade*
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
        UF*
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
        Bairro*
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
        Complemento*
        <input
          type="text"
          placeholder="Complemento"
          name="complemento"
          value={formData.complemento}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Valor do contrato*
        <input
          type="text"
          placeholder="Valor do contrato"
          name="valorcontrato"
          value={formData.valorcontrato}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Tipo*
        <select
          value={formData.tipocontrato}
          onChange={handleInputChange}
          name="tipocontrato"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
      </label>
      {/* <label className={styles.labelStandard}>
        Status*
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
      </label> */}
      <label className={styles.labelStandard}>
        Rede*
        <select
          value={formData.bo_rede === null ? '' : formData.bo_rede.toString()}
          onChange={handleInputChange}
          name="bo_rede"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>
      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
        >
          Cancelar
        </button>
        <button
          className={styles.confirmButton}
          type="button"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};
