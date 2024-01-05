import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/TableAlunados.module.css';
import { BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { ModalSucesso } from '@/components/modal';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { IconBaseProps, IconType } from 'react-icons';

interface FormDataAlunados {
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

interface FormDataTurmas {
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

export default function CadastrarAlunado(): JSX.Element {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const { idEntidadeEscolar, setPage, globalAnoRef } = useGlobalContext();
  const [formDataAlunados, setFormDataAlunados] = useState<FormDataAlunados>({
    id_ee: '',
    ano_ref: '',
    ALUNADOS_3EI: '0',
    ALUNADOS_4EI: '0',
    ALUNADOS_5EI: '0',
    ALUNADOS_1EF: '0',
    ALUNADOS_2EF: '0',
    ALUNADOS_3EF: '0',
    ALUNADOS_4EF: '0',
    ALUNADOS_5EF: '0',
    ALUNADOS_6EF: '0',
    ALUNADOS_7EF: '0',
    ALUNADOS_8EF: '0',
    ALUNADOS_9EF: '0',
    ALUNADOS_1EM: '0',
    ALUNADOS_2EM: '0',
    ALUNADOS_3EM: '0',
  });
  const [formDataTurmas, setFormDataTurmas] = useState<FormDataTurmas>({
    TURMAS_3EI: '0',
    TURMAS_4EI: '0',
    TURMAS_5EI: '0',
    TURMAS_1EF: '0',
    TURMAS_2EF: '0',
    TURMAS_3EF: '0',
    TURMAS_4EF: '0',
    TURMAS_5EF: '0',
    TURMAS_6EF: '0',
    TURMAS_7EF: '0',
    TURMAS_8EF: '0',
    TURMAS_9EF: '0',
    TURMAS_1EM: '0',
    TURMAS_2EM: '0',
    TURMAS_3EM: '0',
  });

  type CombinedFormData = FormDataTurmas & FormDataAlunados;

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.2em',
      color: color,
    };

    return icon(options);
  }

  const fetchData = async (combinedFormData: CombinedFormData) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPost(`${token}`);
      await backendApi.registrarAlunados(combinedFormData);
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        setPage(PageEnumContratos.alunados);
      }, 1500);
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
      setTimeout(() => {
        setError(false);
      }, 6000);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('ALUNADOS_')) {
      setFormDataAlunados((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name.startsWith('TURMAS_')) {
      setFormDataTurmas((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const mergeFormData = (
    turmas: FormDataTurmas,
    alunados: FormDataAlunados,
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
      formDataAlunados.ano_ref = globalAnoRef;
      formDataAlunados.id_ee = idEntidadeEscolar;
      const combinedFormData = mergeFormData(formDataTurmas, formDataAlunados);
      fetchData(combinedFormData);
    } else {
      setError(true);
      setMsgError('Por favor, insira apenas números positivos');
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons
          handleInputChange={handleInputChange}
          setPage={setPage}
          renderIcon={renderIcon}
        />
        <FormComponent
          formDataTurmas={formDataTurmas}
          formDataAlunados={formDataAlunados}
          globalAnoRef={globalAnoRef}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPage={setPage}
          sucesso={sucesso}
          ModalSucesso={ModalSucesso}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Cadastrar Alunado</h4>;

const NavigationButtons: React.FC<any> = ({ setPage }) => (
  <div className={styles.conteinerBtns}>
    <div></div>
    <div className={styles.boxBtns}>
      <BackButton
        color={'var(--gray-300)'}
        colorBackGround={'var(--white)'}
        text="Voltar"
        size="8rem"
        onClick={() => setPage(PageEnumContratos.alunados)}
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
  setPage,
  ModalSucesso,
  sucesso,
}) => {
  return (
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
              value={formDataTurmas.TURMAS_3EI}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 3EI"
              name="ALUNADOS_3EI"
              value={formDataAlunados.ALUNADOS_3EI}
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
              value={formDataTurmas.TURMAS_4EI}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 4EI"
              name="ALUNADOS_4EI"
              value={formDataAlunados.ALUNADOS_4EI}
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
              value={formDataTurmas.TURMAS_5EI}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 5EI"
              name="ALUNADOS_5EI"
              value={formDataAlunados.ALUNADOS_5EI}
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
              value={formDataTurmas.TURMAS_1EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 1EF"
              name="ALUNADOS_1EF"
              value={formDataAlunados.ALUNADOS_1EF}
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
              value={formDataTurmas.TURMAS_2EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 2EF"
              name="ALUNADOS_2EF"
              value={formDataAlunados.ALUNADOS_2EF}
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
              value={formDataTurmas.TURMAS_3EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 3EF"
              name="ALUNADOS_3EF"
              value={formDataAlunados.ALUNADOS_3EF}
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
              value={formDataTurmas.TURMAS_4EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 4EF"
              name="ALUNADOS_4EF"
              value={formDataAlunados.ALUNADOS_4EF}
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
              value={formDataTurmas.TURMAS_5EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 5EF"
              name="ALUNADOS_5EF"
              value={formDataAlunados.ALUNADOS_5EF}
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
              value={formDataTurmas.TURMAS_6EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 6EF"
              name="ALUNADOS_6EF"
              value={formDataAlunados.ALUNADOS_6EF}
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
              value={formDataTurmas.TURMAS_7EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 7EF"
              name="ALUNADOS_7EF"
              value={formDataAlunados.ALUNADOS_7EF}
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
              value={formDataTurmas.TURMAS_8EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 8EF"
              name="ALUNADOS_8EF"
              value={formDataAlunados.ALUNADOS_8EF}
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
              value={formDataTurmas.TURMAS_9EF}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 9EF"
              name="ALUNADOS_9EF"
              value={formDataAlunados.ALUNADOS_9EF}
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
              value={formDataTurmas.TURMAS_1EM}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 1EM"
              name="ALUNADOS_1EM"
              value={formDataAlunados.ALUNADOS_1EM}
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
              value={formDataTurmas.TURMAS_2EM}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 2EM"
              name="ALUNADOS_2EM"
              value={formDataAlunados.ALUNADOS_2EM}
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
              value={formDataTurmas.TURMAS_3EM}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Alunos 3EM"
              name="ALUNADOS_3EM"
              value={formDataAlunados.ALUNADOS_3EM}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </td>
        </tr>
      </table>
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
          onClick={() => setPage(PageEnumContratos.alunados)}
        >
          Cancelar
        </button>
      </div>
      {sucesso && <ModalSucesso message={'Dados salvos com sucesso...'} />}
    </form>
  );
};
