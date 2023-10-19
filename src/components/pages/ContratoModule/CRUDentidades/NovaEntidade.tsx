import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { EntitiesUsuariosPDG } from '@/entities';
import validaCNPJ from '@/validations/validaCNPJ';

interface FormData {
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
  url_dados: string | null;
  id_usuario_pdg: string;
  ativo: boolean | null;
}

export default function NovaEntidade(): JSX.Element {
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
    id_usuario_pdg: '',
    ativo: true,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [userPDG, setUserPDG] = useState<EntitiesUsuariosPDG[]>([]);
  const { setPage, idContrato } = useGlobalContext();

  const handleApiErrors = (error: any) => {
    if (error instanceof FailedToFetchError) {
      setError(true);
    } else {
      throw error;
    }
  };

  useEffect(() => {
    fetchUserPDGData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);
    try {
      const requestBody = {
        ...formData,
        uuid_ec: idContrato,
      };
      await backendApi.registrarEntidadeEscolar(requestBody);
      setPage(PageEnumContratos.entidadesContratuais);
    } catch (error) {
      handleApiErrors(error);
    }
    setPage(PageEnumContratos.entidadesEscolares);
  };

  const fetchUserPDGData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);

    try {
      const responseUserPdg = await backendApi.localizarUsuariosPDG();
      if (responseUserPdg) {
        setUserPDG(responseUserPdg);
      }
      return responseUserPdg;
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const fetchEndereco = async (cep: string) => {
    try {
      cep = cep.replace(/-/g, '');
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
      console.error('Erro ao buscar o CEP:', error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'cep') {
      fetchEndereco(value);
    }
    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['ativo'].includes(name) ? booleanValue : value;

    if (name === 'url_dados' && value === '') {
      setFormData((prev) => ({ ...prev, url_dados: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'url_dados' && (value === '' || value === null)) {
        errors.push('Todos campos são obrigatórios...');
        break;
      }
    }
    if (formData.uf.length > 2) {
      errors.push('Campo UF é permitido somente dois caracteres...');
    }
    if (!validaCNPJ(formData.cnpj_escola)) {
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
          userPDG={userPDG}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Nova Entidade Escolar</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <CreateButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  setPage,
  userPDG,
}) => {
  return (
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
          {userPDG.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.nome}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.labelStandard}>
        CNPJ Escola
        <InputMask
          type="text"
          placeholder="CNPJ Escola"
          mask="99.999.999/9999-99"
          name="cnpj_escola"
          value={formData.cnpj_escola}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        CEP
        <InputMask
          type="text"
          placeholder="CEP"
          mask="99999-999"
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
          onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
