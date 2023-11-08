import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import styles from '@/styles/NovoContrato.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { EntitiesUsuariosPDG } from '@/entities';
import validaCNPJ from '@/validations/validaCNPJ';

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

export default function EditEntidadeEscolar(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idEntidadeEscolar, setPage } = useGlobalContext();
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

  const fetchDataInitial = async () => {
    const response = await fetchEntidadeEscolarData(idEntidadeEscolar);
    const responseUserPdg = await fetchUserPDGData();
    if (responseUserPdg) {
      setUserPDG(responseUserPdg);
    }

    if (response) {
      setFormData({
        id: idEntidadeEscolar,
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
    }
  };
  const fetchUserPDGData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      return await backendApi.localizarUsuariosPDG();
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const fetchEntidadeEscolarData = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);

      return await backendApi.localizarEntidadeEscolar(id);
    } catch (error) {
      console.log('erro aqui');
      handleApiErrors(error);
      return null;
    }
  };

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
      const backendApi = new BackendApiPut(`${token}`);
      await backendApi.editarEntidadeEscolar({
        id: idEntidadeEscolar,
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
      handleApiErrors(error);
    } finally {
      setLoaded(true);
    }
    setPage(PageEnumContratos.entidadesEscolares);
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

  const validateForm = (): boolean => {
    const errors: string[] = [];

    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'url_dados' && (value === '' || value === null)) {
        errors.push('Todos campos são obrigatórios...');
        break;
      }
    }
    if (formData.uf && formData.uf.length > 2) {
      errors.push('Campo UF é permitido somente dois caracteres...');
    }
    if (formData.cnpj_escola) {
      if (!validaCNPJ(formData.cnpj_escola)) {
        errors.push('CNPJ inválido...');
      }
    }
    if (errors.length) {
      setError(true);
      setMsgError(errors.join(' '));
      setTimeout(() => setError(false), 6000);
      return false;
    }
    return true;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'cep') {
      fetchEndereco(value);
    }
    if (name === 'bo_rede') {
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
          userPDG={userPDG}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Editar Entidade Escolar</h4>;

const NavigationButtons: React.FC<any> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
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
          value={formData.cnpj_escola ?? ''}
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
  );
};
