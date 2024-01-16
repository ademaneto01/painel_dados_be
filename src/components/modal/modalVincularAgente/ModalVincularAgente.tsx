import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { useGlobalContext } from '@/context/store';
import { EntitiesAgenteExterno } from '@/entities';

interface FormData {
  id_escola: string;
  id_prof: string;
  especialista: boolean;
  bo_3EI: boolean;
  bo_4EI: boolean;
  bo_5EI: boolean;
  bo_1AI: boolean;
  bo_2AI: boolean;
  bo_3AI: boolean;
  bo_4AI: boolean;
  bo_5AI: boolean;
  bo_6Af: boolean;
  bo_7AF: boolean;
  bo_8AF: boolean;
  bo_9AF: boolean;
  bo_1EM: boolean;
  bo_2EM: boolean;
  bo_3EM: boolean;
}

interface ModalProps {
  onCancel: () => void;
}

const OPTIONS = [
  'bo_3EI',
  'bo_4EI',
  'bo_5EI',
  'bo_1AI',
  'bo_2AI',
  'bo_3AI',
  'bo_4AI',
  'bo_5AI',
  'bo_6Af',
  'bo_7AF',
  'bo_8AF',
  'bo_9AF',
  'bo_1EM',
  'bo_2EM',
  'bo_3EM',
];

export default function ModalVicularAgente({
  onCancel,
}: ModalProps): JSX.Element {
  const initialFormData: FormData = {
    id_escola: '',
    id_prof: '',
    especialista: false,
    bo_3EI: false,
    bo_4EI: false,
    bo_5EI: false,
    bo_1AI: false,
    bo_2AI: false,
    bo_3AI: false,
    bo_4AI: false,
    bo_5AI: false,
    bo_6Af: false,
    bo_7AF: false,
    bo_8AF: false,
    bo_9AF: false,
    bo_1EM: false,
    bo_2EM: false,
    bo_3EM: false,
  };
  const [isProfessor, setIsProfessor] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageEscolasPDG, idEntidadeEscolar, setUsersUpdated } =
    useGlobalContext();
  const [agenteData, setAgenteData] = useState<EntitiesAgenteExterno[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  useEffect(() => {
    fetchUserAgente();
  }, []);

  const fetchData = async () => {
    try {
      formData.id_escola = idEntidadeEscolar;
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const responseAgentes = await backendApi.listarAgenteRelacionadoEscola(
        idEntidadeEscolar,
      );
      const isAgentPresent = responseAgentes.some((agente) => {
        return agente.uuid_agente === formData.id_prof;
      });

      if (!isAgentPresent) {
        const backendApiPost = new BackendApiPost(`${token}`);
        await backendApiPost.vincularAgente(formData);
        setUsersUpdated(true);
        onCancel();
      } else {
        setError(true);
        setMsgError('Usuário já vinculado.');
        setTimeout(() => setError(false), 6000);
        return;
      }
    } catch (error) {
      handleApiErrors(error);
    }
    onCancel();
  };

  const fetchUserAgente = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);

    try {
      const responseUserPdg = await backendApi.listarTodosAgentes();
      if (responseUserPdg) {
        setAgenteData(responseUserPdg);
      }
      return responseUserPdg;
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const getUserCargoById = async (value: any) => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);

    try {
      const responseUserPdg = await backendApi.localizarAgenteId(value);
      if (responseUserPdg[0].cargo === 'Professor') {
        setIsProfessor(true);
      } else {
        setIsProfessor(false);
      }
      return;
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'id_prof' && value !== '') {
      getUserCargoById(value);
    }
    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['escpecialista'].includes(name)
      ? booleanValue
      : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!formData.id_prof) {
      errors.push('Campo Agente é obrigatorio...');
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
    <div className={styles.background} onClick={onCancel}>
      <FormComponent
        formData={formData}
        agenteData={agenteData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setPageEscolasPDG={setPageEscolasPDG}
        onCancel={onCancel}
        handleCheckboxChange={handleCheckboxChange}
        selectedOptions={selectedOptions}
        isProfessor={isProfessor}
        titleModal={'Vincular Agente'}
      />
      {error && <ErrorComponent message={msgError} />}
    </div>
  );
}

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  titleModal,
  onCancel,
  agenteData,
  handleCheckboxChange,
  isProfessor,
}) => {
  return (
    <>
      <form
        className={styles.container}
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            color: 'gray',
          }}
        >
          {titleModal}
        </h1>
        <div className={styles.boxStandard}>
          <label className={styles.labelStandard}>
            Agente
            <select
              value={formData.id_prof}
              onChange={handleInputChange}
              name="id_prof"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              {agenteData
                .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
                .map((user: any) => (
                  <option key={user.uuid_agente} value={user.uuid_agente}>
                    {user.nome}
                  </option>
                ))}
            </select>
          </label>
          <label className={styles.labelStandard}>
            Especialista
            <select
              value={formData.escpecialista}
              onChange={handleInputChange}
              name="especialista"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
          <div>
            {isProfessor && (
              <div>
                <span className={styles.labelTitle}>Séries Escolares</span>
                <div className={styles.optionContainer}>
                  {OPTIONS.map((option) => (
                    <div
                      key={option}
                      className={styles.divCheckBoxVincularAgente}
                    >
                      <input
                        className={styles.checkBoxModalVincularAgente}
                        type="checkbox"
                        value={option}
                        name={option}
                        checked={formData[option]}
                        onChange={handleCheckboxChange}
                      />
                      {option.slice(3)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
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
