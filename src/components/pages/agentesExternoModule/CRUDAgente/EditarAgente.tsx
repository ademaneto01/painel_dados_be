import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumAgentesExterno } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { BackButton, PageContentContainer } from '@/components/shared';

interface FormData {
  nome: string | null;
  cargo: string | null;
  email_primario: string | null;
  email_secundario: string | null;
  telefone: string | null;
  ativo: boolean;
}

export default function EditarAgente(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cargo: '',
    email_primario: '',
    email_secundario: '',
    telefone: '',
    ativo: true,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageAgentesExterno, setUsersUpdated, idAgente } =
    useGlobalContext();

  const handleApiErrors = (error: any) => {
    if (error instanceof FailedToFetchError) {
      setError(true);
    } else {
      throw error;
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);
    const requestBody = {
      id: idAgente,
      ...formData,
    };
    try {
      await backendApi.editarAgente(requestBody);
      setUsersUpdated(true);
      setPageAgentesExterno(PageEnumAgentesExterno.agentes);
    } catch (error) {
      handleApiErrors(error);
    }
    setPageAgentesExterno(PageEnumAgentesExterno.agentes);
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const fetchDataInitial = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);

    try {
      const infosContratoData = await backendApi.localizarAgenteId({
        id: idAgente,
      });

      setFormData({
        nome: infosContratoData[0].nome,
        cargo: infosContratoData[0].cargo,
        email_primario: infosContratoData[0].no_email_primario,
        email_secundario: infosContratoData[0].no_email_secundario,
        telefone: infosContratoData[0].nu_telefone,
        ativo: infosContratoData[0].bo_ativo,
      });
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['ativo'].includes(name) ? booleanValue : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (Object.values(formData).some((v) => v === '' || v === null)) {
      errors.push('Todos campos são obrigatórios...');
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
          Nome
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
          Cargo
          <select
            value={formData.cargo ?? ''}
            onChange={handleInputChange}
            name="cargo"
            className={styles.inputSelect}
          >
            <option value="">-</option>
            <option value="Coordenador">Coordenador</option>
            <option value="Professor">Professor</option>
            <option value="Secretario">Secretário(a)</option>
          </select>
        </label>
        <label className={styles.labelStandard}>
          E-mail Primário
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
          Telefone
          <input
            type="text"
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
