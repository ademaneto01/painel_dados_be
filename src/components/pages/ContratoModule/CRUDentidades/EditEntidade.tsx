import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import styles from '@/styles/NovoContrato.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { EntitiesUsuariosPDG } from '@/entities';
import validaCNPJ from '@/utils/validaCNPJ';
import handleApiErrors from '@/utils/HandleApiErrors';

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
  instagram: string | null;
  facebook: string | null;
  linkwhats: string | null;
  uuid_ec: string | null;
  inep: string | null;
  id_usuario_pdg: string | null;
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
    instagram: '',
    facebook: '',
    linkwhats: '',
    uuid_ec: '',
    id_usuario_pdg: '',
    inep: '',
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
        instagram: response[0]?.instagram || '',
        facebook: response[0]?.facebook || '',
        linkwhats: response[0]?.linkwhats || '',
        uuid_ec: response[0]?.uuid_ec || '',
        inep: response[0]?.inep || '',
        id_usuario_pdg: response[0]?.id_usuario_pdg || '',
      });
    }
  };
  const fetchUserPDGData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      return await backendApi.localizarUsuariosPDG();
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const fetchEntidadeEscolarData = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);

      return await backendApi.localizarEntidadeEscolar(id);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const limparValorInep = (valor: string) => {
    if (typeof valor === 'string') {
      return valor.replace(/\D/g, '');
    } else {
      return String(valor).replace(/\D/g, '');
    }
  };

  const fetchData = async () => {
    const valorInepLimpo = limparValorInep(formData.inep ?? '');
    const requestBody = {
      ...formData,
      inep: valorInepLimpo,
    };
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);
      await backendApi.editarEntidadeEscolar(requestBody);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
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
      if (
        key !== 'url_dados' &&
        key !== 'instagram' &&
        key !== 'facebook' &&
        key !== 'id_usuario_pdg' &&
        key !== 'linkwhats' &&
        (value === '' || value === null)
      ) {
        errors.push('Informe os campos obrigatórios.');
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
        Nome Operacional*
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
        CNPJ Escola*
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
        CEP*
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
        Rua*
        <input
          type="text"
          placeholder="Rua"
          name="endereco"
          value={formData.endereco ?? ''}
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
          value={formData.cidade ?? ''}
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
          value={formData.uf ?? ''}
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
          value={formData.bairro ?? ''}
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
          value={formData.complemento ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        INEP*
        <InputMask
          mask={'99999999'}
          type="text"
          placeholder="INEP"
          name="inep"
          value={formData.inep}
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
        Instagram
        <input
          type="text"
          placeholder="Instagram"
          name="instagram"
          value={formData.instagram ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Facebook
        <input
          type="text"
          placeholder="Facebook"
          name="facebook"
          value={formData.facebook ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Link WhatsApp
        <input
          type="text"
          placeholder="Link WhatsApp"
          name="linkwhats"
          value={formData.linkwhats ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>

      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
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
