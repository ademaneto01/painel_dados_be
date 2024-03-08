import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { BackendApiGet, BackendApiPost, BackendApiPut } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { useGlobalContext } from '@/context/store';
import handleApiErrors from '@/utils';

interface FormData {
  id_escola: string | null;
  id_prof: string | null;
  especialista: boolean;
  bo_3ei: boolean;
  bo_4ei: boolean;
  bo_5ei: boolean;
  bo_1ai: boolean;
  bo_2ai: boolean;
  bo_3ai: boolean;
  bo_4ai: boolean;
  bo_5ai: boolean;
  bo_6af: boolean;
  bo_7af: boolean;
  bo_8af: boolean;
  bo_9af: boolean;
  bo_1em: boolean;
  bo_2em: boolean;
  bo_3em: boolean;
}

interface ModalProps {
  onCancel: () => void;
  userId: string;
}

const OPTIONS = [
  'bo_3ei',
  'bo_4ei',
  'bo_5ei',
  'bo_1ai',
  'bo_2ai',
  'bo_3ai',
  'bo_4ai',
  'bo_5ai',
  'bo_6af',
  'bo_7af',
  'bo_8af',
  'bo_9af',
  'bo_1em',
  'bo_2em',
  'bo_3em',
];

export default function ModalEditarVinculoAgente({
  onCancel,
  userId,
}: ModalProps): JSX.Element {
  const initialFormData: FormData = {
    id_escola: '',
    id_prof: '',
    especialista: false,
    bo_3ei: false,
    bo_4ei: false,
    bo_5ei: false,
    bo_1ai: false,
    bo_2ai: false,
    bo_3ai: false,
    bo_4ai: false,
    bo_5ai: false,
    bo_6af: false,
    bo_7af: false,
    bo_8af: false,
    bo_9af: false,
    bo_1em: false,
    bo_2em: false,
    bo_3em: false,
  };
  const [isProfessor, setIsProfessor] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageEscolasPDG, idEntidadeEscolar, setUsersUpdated } =
    useGlobalContext();
  const [nomeAgente, setNomeAgente] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    fetchDataInitialAgente();
    fetchUserVinculoAgenteInitial();
  }, []);

  const fetchDataInitialAgente = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);

    try {
      const responseUserPdg = await backendApi.localizarAgenteId(userId);

      setNomeAgente(responseUserPdg[0].nome);
      if (responseUserPdg[0].cargo === 'Professor') {
        setIsProfessor(true);
      } else {
        setIsProfessor(false);
      }
      return;
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const fetchUserVinculoAgenteInitial = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApiPost = new BackendApiPost(`${token}`);

    const userData = {
      userId,
      id_ee: idEntidadeEscolar,
    };
    try {
      const responseUserPdg = await backendApiPost.listarVinculoAgente(
        userData,
      );

      const mappedData: FormData = {
        id_escola: responseUserPdg[0].id_escola,
        id_prof: responseUserPdg[0].id_prof,
        especialista: responseUserPdg[0].especialista,
        bo_3ei: responseUserPdg[0].bo_3ei,
        bo_4ei: responseUserPdg[0].bo_4ei,
        bo_5ei: responseUserPdg[0].bo_5ei,
        bo_1ai: responseUserPdg[0].bo_1ai,
        bo_2ai: responseUserPdg[0].bo_2ai,
        bo_3ai: responseUserPdg[0].bo_3ai,
        bo_4ai: responseUserPdg[0].bo_4ai,
        bo_5ai: responseUserPdg[0].bo_5ai,
        bo_6af: responseUserPdg[0].bo_6af,
        bo_7af: responseUserPdg[0].bo_7af,
        bo_8af: responseUserPdg[0].bo_8af,
        bo_9af: responseUserPdg[0].bo_9af,
        bo_1em: responseUserPdg[0].bo_1em,
        bo_2em: responseUserPdg[0].bo_2em,
        bo_3em: responseUserPdg[0].bo_3em,
      };

      setFormData(mappedData);
      return;
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const booleanValue =
      value === 'true' ? true : value === 'false' ? false : null;
    const updatedValue = ['especialista'].includes(name) ? booleanValue : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPut(`${token}`);

    try {
      await backendApi.editarVinculoAgente(formData);
      setUsersUpdated(true);
      onCancel();
      return;
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetchData();
  };

  return (
    <div className={styles.background} onClick={onCancel}>
      <FormComponent
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setPageEscolasPDG={setPageEscolasPDG}
        onCancel={onCancel}
        HeaderComponent={HeaderComponent}
        handleCheckboxChange={handleCheckboxChange}
        selectedOptions={selectedOptions}
        isProfessor={isProfessor}
        nomeAgente={nomeAgente}
        titleModal={'Editar Vinculo Agente'}
      />
      {error && <ErrorComponent message={msgError} />}
    </div>
  );
}

const HeaderComponent: React.FC = () => (
  <h1 className={styles.titleModalEditarVinculoAgetne}>
    Editar Vinculo Agente
  </h1>
);

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  HeaderComponent,
  onCancel,
  handleCheckboxChange,
  isProfessor,
  nomeAgente,
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
        <div className={styles.boxStandard}>
          <HeaderComponent />
          <label className={styles.labelStandard}>
            Agente
            <input
              type="text"
              placeholder="agente"
              name="agente"
              value={nomeAgente}
              className={styles.inputStandard}
              readOnly
            />
          </label>
          <label className={styles.labelStandard}>
            Especialista
            <select
              value={formData.especialista ?? ''}
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
                        checked={formData[option] ?? ''}
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
