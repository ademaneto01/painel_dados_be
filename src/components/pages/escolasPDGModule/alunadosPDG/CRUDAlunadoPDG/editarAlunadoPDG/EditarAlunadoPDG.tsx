import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/TableAlunados.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumEscolasPDG } from '@/enums';
import {
  PageContentContainer,
  BackButton,
  CreateButton,
} from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalSucesso } from '@/components/modal';
import handleApiErrors from '@/utils/HandleApiErrors';

interface FormAlunadosToEdit {
  id_ee: string;
  ano_ref: string;
  ALUNADOS_3EI: string;
  ALUNADOS_4EI: string;
  ALUNADOS_5EI: string;
  ALUNADOS_1EF: string;
  ALUNADOS_2EF: string;
  ALUNADOS_3EF: string;
  ALUNADOS_4EF: string;
  ALUNADOS_5EF: string;
  ALUNADOS_6EF: string;
  ALUNADOS_7EF: string;
  ALUNADOS_8EF: string;
  ALUNADOS_9EF: string;
  ALUNADOS_1EM: string;
  ALUNADOS_2EM: string;
  ALUNADOS_3EM: string;
}

interface FormTurmasToEdit {
  TURMAS_3EI: string;
  TURMAS_4EI: string;
  TURMAS_5EI: string;
  TURMAS_1EF: string;
  TURMAS_2EF: string;
  TURMAS_3EF: string;
  TURMAS_4EF: string;
  TURMAS_5EF: string;
  TURMAS_6EF: string;
  TURMAS_7EF: string;
  TURMAS_8EF: string;
  TURMAS_9EF: string;
  TURMAS_1EM: string;
  TURMAS_2EM: string;
  TURMAS_3EM: string;
}

interface FormDataAlunados {
  id: string;
  id_ee: string;
  ano_ref: string;
  '3EI': string;
  '4EI': string;
  '5EI': string;
  '1EF': string;
  '2EF': string;
  '3EF': string;
  '4EF': string;
  '5EF': string;
  '6EF': string;
  '7EF': string;
  '8EF': string;
  '9EF': string;
  '1EM': string;
  '2EM': string;
  '3EM': string;
}

const initialFormData: FormDataAlunados = {
  id: '',
  id_ee: '',
  ano_ref: '',
  '3EI': '',
  '4EI': '',
  '5EI': '',
  '1EF': '',
  '2EF': '',
  '3EF': '',
  '4EF': '',
  '5EF': '',
  '6EF': '',
  '7EF': '',
  '8EF': '',
  '9EF': '',
  '1EM': '',
  '2EM': '',
  '3EM': '',
};

export default function EditarAlunadoPDG(): JSX.Element {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idEntidadeEscolar, setPageEscolasPDG, globalAnoRef } = useGlobalContext();
  const [sucesso, setSucesso] = useState(false);

  const [formDataAlunados, setFormDataAlunados] =
    useState<FormDataAlunados>(initialFormData);
  const [formDataTurmas, setFormDataTurmas] =
    useState<FormDataAlunados>(initialFormData);
  const [formDataAlunadosEdit, setFormDataAlunadosEdit] =
    useState<FormAlunadosToEdit>({
      id_ee: '',
      ano_ref: '',
      ALUNADOS_3EI: '',
      ALUNADOS_4EI: '',
      ALUNADOS_5EI: '',
      ALUNADOS_1EF: '',
      ALUNADOS_2EF: '',
      ALUNADOS_3EF: '',
      ALUNADOS_4EF: '',
      ALUNADOS_5EF: '',
      ALUNADOS_6EF: '',
      ALUNADOS_7EF: '',
      ALUNADOS_8EF: '',
      ALUNADOS_9EF: '',
      ALUNADOS_1EM: '',
      ALUNADOS_2EM: '',
      ALUNADOS_3EM: '',
    });
  const [formDataTurmasEdit, setFormDataTurmasEdit] =
    useState<FormTurmasToEdit>({
      TURMAS_3EI: '',
      TURMAS_4EI: '',
      TURMAS_5EI: '',
      TURMAS_1EF: '',
      TURMAS_2EF: '',
      TURMAS_3EF: '',
      TURMAS_4EF: '',
      TURMAS_5EF: '',
      TURMAS_6EF: '',
      TURMAS_7EF: '',
      TURMAS_8EF: '',
      TURMAS_9EF: '',
      TURMAS_1EM: '',
      TURMAS_2EM: '',
      TURMAS_3EM: '',
    });

  type CombinedFormData = FormTurmasToEdit & FormAlunadosToEdit;

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.2em',
      color: color,
    };

    return icon(options);
  }

  type FormAlunadosToEditKeys = keyof FormAlunadosToEdit;

  const transformToFormAlunadosEdit = (
    data: FormDataAlunados,
  ): FormAlunadosToEdit => {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = `ALUNADOS_${key}` as FormAlunadosToEditKeys;
      acc[newKey] = data[key as keyof FormDataAlunados] || '0';
      return acc;
    }, {} as FormAlunadosToEdit);
  };

  type FormTurmasToEditKeys = keyof FormTurmasToEdit;
  const transformToFormTurmasEdit = (
    data: FormDataAlunados,
  ): FormTurmasToEdit => {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = `TURMAS_${key}` as FormTurmasToEditKeys;
      acc[newKey] = data[key as keyof FormDataAlunados] || '0'; // Garantindo que o valor não seja undefined
      return acc;
    }, {} as FormTurmasToEdit);
  };

  const loadData = async () => {
    try {
      const [alunadosData, turmasData] = await Promise.all([
        fetchAlunadosData(),
        fetchTurmasData(),
      ]);

      const alunados = alunadosData;
      const turmas = turmasData;

      if (alunados && turmas) {
        setFormDataAlunados(alunados[0]);
        setFormDataTurmas(turmas[0]);

        setFormDataAlunadosEdit(transformToFormAlunadosEdit(alunados[0]));
        setFormDataTurmasEdit(transformToFormTurmasEdit(turmas[0]));
      }
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchAlunadosData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const data = {
        id_ee: idEntidadeEscolar,
        ano_ref: globalAnoRef,
      };
      return await backendApi.listarIndividualAlunados(data);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const fetchTurmasData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const data = {
        id_ee: idEntidadeEscolar,
        ano_ref: globalAnoRef,
      };
      return await backendApi.listarIndividualTurmas(data);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const editAlunado = async (combinedFormData: CombinedFormData) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);
      await backendApi.editarAlunados(combinedFormData);
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        setPageEscolasPDG(PageEnumEscolasPDG.alunadosPDG);
      }, 1500);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
    }
  };

  const mergeFormData = (
    turmas: FormTurmasToEdit,
    alunados: FormAlunadosToEdit,
  ) => {
    return { ...turmas, ...alunados };
  };

  const validateFormulario = () => {
    const todosCampos: Record<string, any> = {
      ...formDataAlunados,
      ...formDataTurmas,
    };
    for (const campo in todosCampos) {
      if (parseInt(todosCampos[campo]) < 0) {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormulario()) {
      formDataAlunadosEdit.ano_ref = globalAnoRef;
      formDataAlunadosEdit.id_ee = idEntidadeEscolar;
      const combinedFormData = mergeFormData(
        formDataTurmasEdit,
        formDataAlunadosEdit,
      );
      editAlunado(combinedFormData);
    } else {
      setError(true);
      setMsgError('Por favor, insira apenas números positivos');
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('ALUNADOS_')) {
      setFormDataAlunadosEdit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormDataAlunados((prevState) => ({
        ...prevState,
        [name.replace('ALUNADOS_', '')]: value,
      }));
    } else if (name.startsWith('TURMAS_')) {
      setFormDataTurmasEdit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormDataTurmas((prevState) => ({
        ...prevState,
        [name.replace('TURMAS_', '')]: value,
      }));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons
          handleInputChange={handleInputChange}
          setPageEscolasPDG={setPageEscolasPDG}
          renderIcon={renderIcon}
        />
        <FormComponent
          formDataTurmas={formDataTurmas}
          formDataAlunados={formDataAlunados}
          sucesso={sucesso}
          globalAnoRef={globalAnoRef}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPageEscolasPDG={setPageEscolasPDG}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Editar Alunado</h4>;

const NavigationButtons: React.FC<any> = ({ setPageEscolasPDG }) => (
  <div className={styles.conteinerBtns}>
    <div></div>
    <div className={styles.boxBtns}>
      <CreateButton
        colorBackGround={'var(--blue-300)'}
        color={'var(--white)'}
        text="Editar"
        size="7rem"
        onClick={() => {}}
      />
      <BackButton
        color={'var(--gray-300)'}
        colorBackGround={'var(--white)'}
        text="Voltar"
        size="8rem"
        onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.alunadosPDG)}
      />
    </div>
  </div>
);

const FormComponent: React.FC<any> = ({
  formDataAlunados,
  formDataTurmas,
  globalAnoRef,
  handleInputChange,
  handleSubmit,
  sucesso,
  setPageEscolasPDG,
}) => {
  return (
    <>
      <form className={styles.table} onSubmit={handleSubmit}>
        <span>Ano de referência: {globalAnoRef}</span>
        <table>
          <tr>
            <th>Série</th>
            <th>Turmas</th>
            <th>Alunos</th>
          </tr>
          <tr>
            <td>3EI</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 3EI"
                name="TURMAS_3EI"
                value={formDataTurmas['3EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 3EI"
                name="ALUNADOS_3EI"
                value={formDataAlunados['3EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>4EI</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 4EI"
                name="TURMAS_4EI"
                value={formDataTurmas['4EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 4EI"
                name="ALUNADOS_4EI"
                value={formDataAlunados['4EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>5EI</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 5EI"
                name="TURMAS_5EI"
                value={formDataTurmas['5EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 5EI"
                name="ALUNADOS_5EI"
                value={formDataAlunados['5EI']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>1EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 1EF"
                name="TURMAS_1EF"
                value={formDataTurmas['1EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 1EF"
                name="ALUNADOS_1EF"
                value={formDataAlunados['1EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>

          <tr>
            <td>2EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 2EF"
                name="TURMAS_2EF"
                value={formDataTurmas['2EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 2EF"
                name="ALUNADOS_2EF"
                value={formDataAlunados['2EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>3EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 3EF"
                name="TURMAS_3EF"
                value={formDataTurmas['3EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 3EF"
                name="ALUNADOS_3EF"
                value={formDataAlunados['3EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>4EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 4EF"
                name="TURMAS_4EF"
                value={formDataTurmas['4EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 4EF"
                name="ALUNADOS_4EF"
                value={formDataAlunados['4EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>5EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 5EF"
                name="TURMAS_5EF"
                value={formDataTurmas['5EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 5EF"
                name="ALUNADOS_5EF"
                value={formDataAlunados['5EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>6EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 6EF"
                name="TURMAS_6EF"
                value={formDataTurmas['6EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 6EF"
                name="ALUNADOS_6EF"
                value={formDataAlunados['6EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>7EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 7EF"
                name="TURMAS_7EF"
                value={formDataTurmas['7EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 7EF"
                name="ALUNADOS_7EF"
                value={formDataAlunados['7EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>8EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 8EF"
                name="TURMAS_8EF"
                value={formDataTurmas['8EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 8EF"
                name="ALUNADOS_8EF"
                value={formDataAlunados['8EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>9EF</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 9EF"
                name="TURMAS_9EF"
                value={formDataTurmas['9EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 9EF"
                name="ALUNADOS_9EF"
                value={formDataAlunados['9EF']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>1EM</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 1EM"
                name="TURMAS_1EM"
                value={formDataTurmas['1EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 1EM"
                name="ALUNADOS_1EM"
                value={formDataAlunados['1EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>2EM</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 2EM"
                name="TURMAS_2EM"
                value={formDataTurmas['2EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 2EM"
                name="ALUNADOS_2EM"
                value={formDataAlunados['2EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
          <tr>
            <td>3EM</td>
            <td>
              <input
                type="number"
                placeholder="Turmas 3EM"
                name="TURMAS_3EM"
                value={formDataTurmas['3EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Alunos 3EM"
                name="ALUNADOS_3EM"
                value={formDataAlunados['3EM']}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </td>
          </tr>
        </table>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.alunadosPDG)}
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
      {sucesso && <ModalSucesso message={'Dados alterados com sucesso...'} />}
    </>
  );
};
