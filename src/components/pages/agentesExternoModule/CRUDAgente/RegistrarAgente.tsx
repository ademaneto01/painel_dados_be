import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import InputMask from 'react-input-mask';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumAgentesExterno } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { CreateButton, PageContentContainer } from '@/components/shared';

interface FormData {
  nome: string;
  cargo: string;
  email_primario: string;
  email_secundario: string;
  telefone: string;
  data_nascimento: string;
  ativo: boolean;
  interlocutor: boolean;
}

export default function RegistrarAgente(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cargo: '',
    email_primario: '',
    email_secundario: '',
    telefone: '',
    data_nascimento: '',
    ativo: true,
    interlocutor: false,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageAgentesExterno, setUsersUpdated } = useGlobalContext();

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
      await backendApi.registrarAgente(formData);
      setUsersUpdated(true);
      setPageAgentesExterno(PageEnumAgentesExterno.agentes);
    } catch (error) {
      handleApiErrors(error);
    }
    setPageAgentesExterno(PageEnumAgentesExterno.agentes);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type } = e.target;
    let value: any;

    if (type === "checkbox") {
        value = (e.target as HTMLInputElement).checked;
        
    } else {
        value = e.target.value;
        const booleanValue = value === 'true' ? true : value === 'false' ? false : null;
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

const HeaderComponent: React.FC = () => <h4>Novo Agente</h4>;

const NavigationButtons: React.FC<{
  setPageAgentesExterno: React.Dispatch<
    React.SetStateAction<PageEnumAgentesExterno>
  >;
}> = ({ setPageAgentesExterno }) => (
  <div className={styles.boxBtns}>
    <CreateButton
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
          Nome
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          Cargo
          <select
            value={formData.cargo}
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
            value={formData.data_nascimento}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          E-mail Primário
          <input
            type="text"
            placeholder="E-mail Primário"
            name="email_primario"
            value={formData.email_primario}
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
            value={formData.email_secundario}
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
            value={formData.telefone}
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
              setPageAgentesExterno(PageEnumAgentesExterno.agentes)
            }
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
