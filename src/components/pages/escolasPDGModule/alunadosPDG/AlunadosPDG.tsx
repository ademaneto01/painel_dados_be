import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/TableAlunados.module.css';
import InputMask from 'react-input-mask';
import { BackendApiGet, BackendApiDelete } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumEscolasPDG } from '@/enums';
import { PageEnumContratos } from '@/enums';
import { FaSearch } from 'react-icons/fa';
import {
  PageContentContainer,
  BackButton,
  CreateButton,
  DeleteButton,
} from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalSucesso } from '@/components/modal';
import handleApiErrors from '@/utils/HandleApiErrors';

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

export default function AlunadosPDG(): JSX.Element {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idEntidadeEscolar, setPageEscolasPDG, setGlobalAnoRef } = useGlobalContext();
  const [formAnoRef, setFormAnoRef] = useState('');
  const [isDataFilled, setIsDataFilled] = useState(Boolean);
  const [spanCadastro, setSpanCadastro] = useState(Boolean);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [messageSucesso, setMessageSucesso] = useState('');
  const [formDataAlunados, setFormDataAlunados] =
    useState<FormDataAlunados>(initialFormData);
  const [formDataTurmas, setFormDataTurmas] =
    useState<FormDataAlunados>(initialFormData);

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.2em',
      color: color,
    };

    return icon(options);
  }

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
        setIsDataFilled(true);
      } else {
        setIsDataFilled(false);
        setSpanCadastro(true);
      }
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      setIsDataFilled(false);
      setSpanCadastro(true);
    }
  };

  const fetchAlunadosData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const data = {
        id_ee: idEntidadeEscolar,
        ano_ref: formAnoRef,
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
        ano_ref: formAnoRef,
      };
      return await backendApi.listarIndividualTurmas(data);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formAnoRef.length === 4) {
      if (parseInt(formAnoRef) >= 2017 && parseInt(formAnoRef) <= 2026) {
        loadData();
      } else {
        setError(true);
        setMsgError(
          'Ano de busca inválido. Por favor, insira um ano entre 2017 e 2026.',
        );
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } else {
      setIsDataFilled(false);
      setSpanCadastro(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiDelete(`${token}`);
      const userData = {
        id_alunado: formDataAlunados.id,
        id_turmas: formDataTurmas.id,
      };
      const response = await backendApi.deletarAlunado(userData);
      setSucesso(true);
      setMessageSucesso(response);
      setIsDataFilled(false);
      setShowModalDelete(false);
      setTimeout(() => {
        setSucesso(false);
        setPageEscolasPDG(PageEnumEscolasPDG.alunadosPDG);
      }, 1600);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

  const handleNavigate = () => {
    setPageEscolasPDG(PageEnumEscolasPDG.cadastroAlunadoPDG);
    setGlobalAnoRef(formAnoRef);
  };
  const handleNavigateEdit = () => {
    setPageEscolasPDG(PageEnumEscolasPDG.editarAlunadoPDG);
    setGlobalAnoRef(formAnoRef);
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'ano_ref') {
      const valueAnoRef = value.replace(/-/g, '');
      for (const validaData of valueAnoRef) {
        if (validaData === '_') {
          setSpanCadastro(false);
          return null;
        }
      }
      if (valueAnoRef.length !== 4) {
        setSpanCadastro(false);
        return null;
      }
      setFormAnoRef(value);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons
          isDataFilled={isDataFilled}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPageEscolasPDG={setPageEscolasPDG}
          formAnoRef={formAnoRef}
          spanCadastro={spanCadastro}
          renderIcon={renderIcon}
          handleNavigate={handleNavigate}
          handleNavigateEdit={handleNavigateEdit}
          setShowModalDelete={setShowModalDelete}
        />
        <FormComponent
          isDataFilled={isDataFilled}
          spanCadastro={spanCadastro}
          formDataTurmas={formDataTurmas}
          formDataAlunados={formDataAlunados}
          formAnoRef={formAnoRef}
          setShowModalDelete={setShowModalDelete}
          showModalDelete={showModalDelete}
          handleDelete={handleDelete}
          messageSucesso={messageSucesso}
          sucesso={sucesso}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Alunado</h4>;

const NavigationButtons: React.FC<any> = ({
  setPageEscolasPDG,
  handleInputChange,
  isDataFilled,
  handleSubmit,
  formAnoRef,
  spanCadastro,
  renderIcon,
  handleNavigate,
  handleNavigateEdit,
  setShowModalDelete,
}) => (
  <div className={styles.conteinerBtns}>
    <form className={styles.boxInputBtn} onSubmit={handleSubmit}>
      <InputMask
        type="text"
        mask="9999"
        placeholder="Buscar por Ano"
        name="ano_ref"
        onChange={handleInputChange}
        className={styles.inputSearch}
      />
      <CreateButton
        colorBackGround={'var(--blue-300)'}
        color={'var(--white)'}
        icon={renderIcon(FaSearch)}
        size="3rem"
        onClick={handleSubmit}
      />
    </form>

    <div className={styles.boxBtns}>
      {isDataFilled ? (
        <>
          <CreateButton
            colorBackGround={'var(--blue-300)'}
            color={'var(--white)'}
            text="Editar"
            size="7rem"
            onClick={() => {
              handleNavigateEdit();
            }}
          />
          <DeleteButton
            color={'var(--white)'}
            colorBackGround={'var(--red-300)'}
            text="Deletar"
            size="7rem"
            onClick={() => {
              setShowModalDelete(true);
            }}
          />
        </>
      ) : (
        formAnoRef.length === 4 &&
        spanCadastro && (
          <CreateButton
            colorBackGround={'var(--blue-300)'}
            color={'var(--white)'}
            text="Cadastrar"
            size="7rem"
            onClick={() => {
              handleNavigate();
            }}
          />
        )
      )}

      <BackButton
        color={'var(--gray-300)'}
        colorBackGround={'var(--white)'}
        text="Voltar"
        size="8rem"
        onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.escolasPDG)}
      />
    </div>
  </div>
);

const FormComponent: React.FC<any> = ({
  formDataAlunados,
  formDataTurmas,
  isDataFilled,
  spanCadastro,
  formAnoRef,
  showModalDelete,
  setShowModalDelete,
  handleDelete,
  sucesso,
  messageSucesso,
}) => {
  return (
    <>
      {isDataFilled ? (
        <div className={styles.table}>
          <span>Ano de referência: {formDataTurmas.ano_ref}</span>
          <table>
            <tr>
              <th>Série</th>
              <th>Turmas</th>
              <th>Alunos</th>
            </tr>
            <tr>
              <td>3EI</td>
              <td>{formDataTurmas['3EI']}</td>
              <td>{formDataAlunados['3EI']}</td>
            </tr>
            <tr>
              <td>4EI</td>
              <td>{formDataTurmas['4EI']}</td>
              <td>{formDataAlunados['4EI']}</td>
            </tr>
            <tr>
              <td>5EI</td>
              <td>{formDataTurmas['5EI']}</td>
              <td>{formDataAlunados['5EI']}</td>
            </tr>
            <tr>
              <td>1EF</td>
              <td>{formDataTurmas['1EF']}</td>
              <td>{formDataAlunados['1EF']}</td>
            </tr>

            <tr>
              <td>2EF</td>
              <td>{formDataTurmas['2EF']}</td>
              <td>{formDataAlunados['2EF']}</td>
            </tr>
            <tr>
              <td>3EF</td>
              <td>{formDataTurmas['3EF']}</td>
              <td>{formDataAlunados['3EF']}</td>
            </tr>
            <tr>
              <td>4EF</td>
              <td>{formDataTurmas['4EF']}</td>
              <td>{formDataAlunados['4EF']}</td>
            </tr>
            <tr>
              <td>5EF</td>
              <td>{formDataTurmas['5EF']}</td>
              <td>{formDataAlunados['5EF']}</td>
            </tr>
            <tr>
              <td>6EF</td>
              <td>{formDataTurmas['6EF']}</td>
              <td>{formDataAlunados['6EF']}</td>
            </tr>
            <tr>
              <td>7EF</td>
              <td>{formDataTurmas['7EF']}</td>
              <td>{formDataAlunados['7EF']}</td>
            </tr>
            <tr>
              <td>8EF</td>
              <td>{formDataTurmas['8EF']}</td>
              <td>{formDataAlunados['8EF']}</td>
            </tr>
            <tr>
              <td>9EF</td>
              <td>{formDataTurmas['9EF']}</td>
              <td>{formDataAlunados['9EF']}</td>
            </tr>
            <tr>
              <td>1EM</td>
              <td>{formDataTurmas['1EM']}</td>
              <td>{formDataAlunados['1EM']}</td>
            </tr>
            <tr>
              <td>2EM</td>
              <td>{formDataTurmas['2EM']}</td>
              <td>{formDataAlunados['2EM']}</td>
            </tr>
            <tr>
              <td>3EM</td>
              <td>{formDataTurmas['3EM']}</td>
              <td>{formDataAlunados['3EM']}</td>
            </tr>
          </table>
        </div>
      ) : (
        <>
          {formAnoRef.length === 4 && spanCadastro ? (
            <PageContentContainer>
              <span>
                Caso deseje registrar alunos e turmas referente ao ano letivo de{' '}
                {formAnoRef}, por favor, clique no botão "Cadastrar" localizado
                acima.
              </span>
            </PageContentContainer>
          ) : (
            ''
          )}
        </>
      )}
      {sucesso && <ModalSucesso message={messageSucesso} />}
      {showModalDelete && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir os dados referentes ao de: ${formDataTurmas.ano_ref}?`}
          onConfirm={() => {
            handleDelete();
          }}
          onCancel={() => setShowModalDelete(false)}
        />
      )}
    </>
  );
};
