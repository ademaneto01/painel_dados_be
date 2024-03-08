import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import InputMask from 'react-input-mask';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumAgentesExterno } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { BackButton, PageContentContainer } from '@/components/shared';
import handleApiErrors from '@/utils';

interface FormData {
  nome: string;
  cargo: string;
  email_primario: string;
  email_secundario: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  linkedin: string | null;
  instagram: string | null;
  interlocutor: boolean;
  ativo: boolean;
}

export default function EditarAgente(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cargo: '',
    email_primario: '',
    email_secundario: '',
    telefone: '',
    data_nascimento: '',
    linkedin: '',
    instagram: '',
    interlocutor: false,
    ativo: true,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageAgentesExterno, setUsersUpdated, idAgente } =
    useGlobalContext();

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPut(`${token}`);
    const requestBody = {
      id: idAgente,
      ...formData,
    };
    try {
      await backendApi.editarAgente(requestBody);
      setUsersUpdated(true);
      setPageAgentesExterno(PageEnumAgentesExterno.agentes);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
    }
    setPageAgentesExterno(PageEnumAgentesExterno.agentes);
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const fetchDataInitial = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);

    try {
      const infosContratoData = await backendApi.localizarAgenteId(idAgente);

      setFormData({
        nome: infosContratoData[0].nome,
        cargo: infosContratoData[0].cargo,
        email_primario: infosContratoData[0].no_email_primario,
        email_secundario: infosContratoData[0].no_email_secundario,
        telefone: infosContratoData[0].nu_telefone,
        data_nascimento: infosContratoData[0].data_nascimento,
        linkedin: infosContratoData[0].linkedin,
        instagram: infosContratoData[0].instagram,
        interlocutor: infosContratoData[0].interlocutor,
        ativo: infosContratoData[0].bo_ativo,
      });
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type } = e.target;
    let value: any;

    if (type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else {
      value = e.target.value;
      const booleanValue =
        value === 'true' ? true : value === 'false' ? false : null;
      value = ['ativo'].includes(name) ? booleanValue : value;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.nome.trim()) {
      errors.push('O campo nome é obrigatório.');
    }

    if (!formData.cargo) {
      errors.push('O campo cargo é obrigatório.');
    }

    if (!formData.email_primario.trim()) {
      errors.push('O campo e-mail primário é obrigatório.');
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
        <NavigationButtons setPageAgentesExterno={setPageAgentesExterno} />
        <FormComponent
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPageAgentesExterno={setPageAgentesExterno}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Editar Agente</h4>;

const NavigationButtons: React.FC<{
  setPageAgentesExterno: React.Dispatch<
    React.SetStateAction<PageEnumAgentesExterno>
  >;
}> = ({ setPageAgentesExterno }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPageAgentesExterno(PageEnumAgentesExterno.agentes)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  setPageAgentesExterno,
}) => {
  return (
    <>
      <form className={styles.boxForm} onSubmit={handleSubmit}>
        <label className={styles.labelStandard}>
          Nome*
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={formData.nome ?? ''}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          Cargo*
          <select
            value={formData.cargo ?? ''}
            onChange={handleInputChange}
            name="cargo"
            className={styles.inputSelect}
          >
            <option value="">-</option>
            <option value="Diretor">Diretor(a)</option>
            <option value="Mantenedor">Mantenedor(a)</option>
            <option value="Coordenador">Coordenador(a)</option>
            <option value="Professor">Professor(a)</option>
            <option value="Secretario">Secretário(a)</option>
          </select>
        </label>
        <label className={styles.labelStandard}>
          Data de Nascimento
          <InputMask
            type="text"
            mask="99/99/9999"
            placeholder="Data de Nascimento"
            name="data_nascimento"
            value={formData.data_nascimento ?? ''}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          E-mail Primário*
          <input
            type="text"
            placeholder="E-mail Primário"
            name="email_primario"
            value={formData.email_primario ?? ''}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          E-mail Secundário
          <input
            type="text"
            placeholder="E-mail Secundário"
            name="email_secundario"
            value={formData.email_secundario ?? ''}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          Linkedin
          <input
            type="text"
            placeholder="Linkedin"
            name="linkedin"
            value={formData.linkedin ?? ''}
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
          Telefone
          <InputMask
            type="text"
            mask="(99) 99999-9999"
            placeholder="Telefone"
            name="telefone"
            value={formData.telefone ?? ''}
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
        <label className={styles.labelCheckBox}>
          Interlocutor:
          <input
            type="checkbox"
            name="interlocutor"
            checked={formData.interlocutor}
            onChange={handleInputChange}
            className={styles.inputCheckBox}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={() =>
              setPageAgentesExterno(PageEnumAgentesExterno.agentes)
            }
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
    </>
  );
};
