import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IconBaseProps, IconType } from 'react-icons';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { useGlobalContext } from '@/context/store';
import { EntitiesAgenteExterno } from '@/entities';
import handleApiErrors from '@/utils';

interface FormData {
  id_escola: string;
  id_prof: string;
  especialista: boolean | null;
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
    especialista: null,
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
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [nameSearch, setNameSearch] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageEscolasPDG, idEntidadeEscolar, setUsersUpdated } =
    useGlobalContext();
  const [agenteData, setAgenteData] = useState<EntitiesAgenteExterno[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1em',
      color: color,
    };

    return icon(options);
  }

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
      handleApiErrors(error, setError, setMsgError);
    }
    onCancel();
  };

  const fetchUserAgente = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const responseUserPdg = await backendApi.listarTodosAgentes();
      if (responseUserPdg) {
        setAgenteData(responseUserPdg);
      }
      return responseUserPdg;
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
  const filteredOptions = agenteData.filter((entidade) =>
    entidade.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleOptionSelect = (option: EntitiesAgenteExterno) => {
    setNameSearch(option.nome);
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_prof: option.uuid_agente,
    }));
    if (option.cargo === 'Professor') {
      setIsProfessor(true);
    } else {
      setIsProfessor(false);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setNameSearch('');
      fetchUserAgente();
      setIsProfessor(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

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
        containerRef={containerRef}
        renderIcon={renderIcon}
        setShowOptions={setShowOptions}
        showOptions={showOptions}
        nameSearch={nameSearch}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredOptions={filteredOptions}
        handleOptionSelect={handleOptionSelect}
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
  handleCheckboxChange,
  isProfessor,
  containerRef,
  renderIcon,
  setShowOptions,
  showOptions,
  nameSearch,
  searchTerm,
  handleSearchChange,
  filteredOptions,
  handleOptionSelect,
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
          <div className={styles.boxStatus}>
            <label className={styles.labelStandard}>
              Agente
              <div className={styles.searchSelectContainer} ref={containerRef}>
                <div className={styles.boxsearchInput}>
                  <input
                    type="text"
                    readOnly
                    value={nameSearch}
                    name="nameSearch"
                    onClick={() =>
                      setShowOptions(showOptions === true ? false : true)
                    }
                    className={styles.searchInput}
                  />
                  {renderIcon(IoIosArrowDown)}
                </div>

                {showOptions && (
                  <div className={styles.optionsContainer}>
                    <div className={styles.inputContainer}>
                      {renderIcon(FaSearch)}
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInputSelect}
                      />
                    </div>
                    <div className={styles.scrollableOptionsContainer}>
                      {filteredOptions.map((option: EntitiesAgenteExterno) => (
                        <div
                          key={option.uuid_agente}
                          className={styles.optionItem}
                          onClick={() => handleOptionSelect(option)}
                        >
                          {`${option.nome} - ${option.cargo}`}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
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
