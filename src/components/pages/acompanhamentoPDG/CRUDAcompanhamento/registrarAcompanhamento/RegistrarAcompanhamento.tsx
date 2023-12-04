import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react';
import styles from '@/styles/AcompanhamentoPDG.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import InputMask from 'react-input-mask';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import dynamic from 'next/dynamic';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IconBaseProps, IconType } from 'react-icons';
interface FormData {
  id: string;
  nome_operacional: string;
}

interface FormDataAgenteExternoRelacionado {
  uuid_agente: string;
  nome: string;
}

const MultilineInputSSR = dynamic(
  () => import('../../../quill/multilineInput/MultilineInput'),
  {
    ssr: false,
  },
);

export default function RegistrarAcompanhamento(): JSX.Element {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const [yearObservation, setYearObservation] = useState(
    'Enter a year in observation date',
  );
  const [entidadesEscolares, setEntidadesEscolares] = useState<FormData[]>([]);
  const [agentesExternoData, setAgentesExternoData] = useState<
    FormDataAgenteExternoRelacionado[]
  >([]);
  const { setPage, idContrato } = useGlobalContext();

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.3em',
      color: color,
    };

    return icon(options);
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.todasEntidadesEscolares();
      setEntidadesEscolares(
        response.map((entidade) => ({
          id: entidade.id,
          nome_operacional: entidade.nome_operacional,
        })),
      );
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const fetchAgentesExterno = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.listarAgenteRelacionadoEscola(id);
      setAgentesExternoData(
        response.map((agentesExterno) => ({
          uuid_agente: agentesExterno.uuid_agente,
          nome: agentesExterno.nome,
        })),
      );
    } catch (error) {
      handleApiErrors(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'dataofobservation') {
      const year = value.substring(0, 4);
      setYearObservation(year);
    }
    if (name === 'dataofobservation' && value === '') {
      setYearObservation('Enter a year in observation date');
    }
  };

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setNameSearch('');
      setAgentesExternoData([]);
    }
    setShowOptions(true);
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

  const handleOptionSelect = (option: FormData) => {
    setNameSearch(option.nome_operacional);
    fetchAgentesExterno(option.id);
    setShowOptions(true);
  };

  const filteredOptions = entidadesEscolares.filter((entidade) =>
    entidade.nome_operacional.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPage={setPage}
          handleOptionSelect={handleOptionSelect}
          setShowOptions={setShowOptions}
          showOptions={showOptions}
          filteredOptions={filteredOptions}
          handleSearchChange={handleSearchChange}
          nameSearch={nameSearch}
          handleInputChange={handleInputChange}
          entidadesEscolares={entidadesEscolares}
          agentesExternoData={agentesExternoData}
          yearObservation={yearObservation}
          containerRef={containerRef}
          renderIcon={renderIcon}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Novo Acompanhamento</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
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
  handleSubmit,
  setPage,
  agentesExternoData,
  yearObservation,
  handleInputChange,
  filteredOptions,
  searchTerm,
  nameSearch,
  setShowOptions,
  showOptions,
  handleSearchChange,
  handleOptionSelect,
  containerRef,
  renderIcon,
}) => {
  return (
    <form className={styles.conteinerForm} onSubmit={handleSubmit}>
      <div className={styles.boxStatus}>
        <label className={styles.labelStandard}>
          Partner school
          <div className={styles.searchSelectContainer} ref={containerRef}>
            <div className={styles.boxsearchInput}>
              <input
                type="text"
                readOnly
                value={nameSearch}
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
                  {filteredOptions.map((option: FormData) => (
                    <div
                      key={option.id}
                      className={styles.optionItem}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.nome_operacional}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </label>
      </div>
      <div className={styles.conteinerWidthAll}>
        <h3>Observation Info.</h3>
        <label className={styles.labelStandard}>
          Educator's name
          <select
            name="educatorsname"
            onChange={handleInputChange}
            className={styles.inputSelect}
          >
            <option value="">-</option>
            {agentesExternoData.map(
              (agentesExterno: FormDataAgenteExternoRelacionado) => (
                <option
                  key={agentesExterno.uuid_agente}
                  value={agentesExterno.uuid_agente}
                >
                  {agentesExterno.nome}
                </option>
              ),
            )}
          </select>
        </label>
        <label className={styles.labelStandard}>
          Data of observation
          <InputMask
            type="text"
            placeholder="YYYY/MM/DD"
            mask="9999/99/99"
            name="dataofobservation"
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
      </div>
      <div className={styles.conteinerWidthAll}>
        <h3>Cycle</h3>
        <label className={styles.labelStandard}>
          Grade
          <select
            onChange={handleInputChange}
            name="grade"
            className={styles.inputSelect}
          >
            <option value="">-</option>
            <option value="EI3">EI3</option>
            <option value="EI4">EI4</option>
            <option value="EI5">EI5</option>
            <option value="EF1">EF1</option>
            <option value="EF2">EF2</option>
            <option value="EF3">EF3</option>
            <option value="EF4">EF4</option>
            <option value="EF5">EF5</option>
            <option value="EF6">EF6</option>
            <option value="EF7">EF7</option>
            <option value="EF8">EF8</option>
            <option value="EF9">EF9</option>
            <option value="EM1">EM1</option>
            <option value="EM2">EM2</option>
            <option value="EM3">EM3</option>
          </select>
        </label>
        <label className={styles.labelStandard}>
          # of students
          <input
            type="text"
            placeholder="# of students"
            name="status"
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          Subject
          <select
            onChange={handleInputChange}
            name="status"
            className={styles.inputSelect}
          >
            <option value="">-</option>
            <option value="language">Language</option>
            <option value="science">Science</option>
            <option value="wc&g">WC&G</option>
          </select>
        </label>
        <label className={styles.labelStandard}>
          Lesson plan Be #:
          <input
            type="text"
            placeholder="Lesson plan Be #:"
            name="status"
            className={styles.inputStandard}
          />
        </label>
        <label className={styles.labelStandard}>
          Cycle
          <select
            onChange={handleInputChange}
            name="cycle"
            className={styles.inputSelect}
          >
            <option value="">-</option>
            {yearObservation !== 'Enter a year in observation date' ? (
              <>
                <option value={`${yearObservation}.1`}>
                  {`${yearObservation}.1`}
                </option>
                <option value={`${yearObservation}.2`}>
                  {`${yearObservation}.2`}
                </option>
                <option value={`${yearObservation}.3`}>
                  {`${yearObservation}.3`}
                </option>
                <option value={`${yearObservation}.4`}>
                  {`${yearObservation}.4`}
                </option>
                <option value="extra">Extra</option>
              </>
            ) : (
              <option value={yearObservation}>{yearObservation}</option>
            )}
          </select>
        </label>
      </div>
      <div className={styles.conteinerWidthAll}>
        <div className={styles.boxToAlignTitleLearning}>
          <h3>Learning setting</h3>
          <div className={styles.conteinerLearning}>
            <div className={styles.boxLearning}>
              <label className={styles.labelStandard}>
                Digital projector/TV
                <select
                  onChange={handleInputChange}
                  name="digitalprojector"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="notavailable">Not Available</option>
                  <option value="notused">Not Used</option>
                  <option value="used">Used</option>
                  <option value="usednglbe">Used NGL/Be</option>
                </select>
              </label>
              <label className={styles.labelStandard}>
                Board
                <select
                  onChange={handleInputChange}
                  name="board"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="notavailable">Not Available</option>
                  <option value="notused">Not Used</option>
                  <option value="usedasneeded">Used as needed</option>
                  <option value="useddeliberately">Used deliberately</option>
                </select>
              </label>
              <label className={styles.labelStandard}>
                English Corner
                <select
                  onChange={handleInputChange}
                  name="englishcorner"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="notavailable">Not Available</option>
                  <option value="available">Available</option>
                  <option value="bematerials">Be Materials</option>
                </select>
              </label>
            </div>
            <div className={styles.boxLearning}>
              <label className={styles.labelStandard}>
                Noise level
                <select
                  onChange={handleInputChange}
                  name="noiselevel"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="v.loud">V. Loud</option>
                  <option value="loud">Loud</option>
                  <option value="normal">Normal</option>
                  <option value="quiet">Quiet</option>
                </select>
              </label>
              <label className={styles.labelStandard}>
                Resource audio qlty.
                <select
                  onChange={handleInputChange}
                  name="resourceaudioqlty"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="poor&low">Poor & Low</option>
                  <option value="poor">Poor</option>
                  <option value="toolow">Too Low</option>
                  <option value="good">Good</option>
                </select>
              </label>
              <label className={styles.labelStandard}>
                NGL/Be Materials
                <select
                  onChange={handleInputChange}
                  name="nglbematerials"
                  className={styles.inputSelect}
                >
                  <option value="">-</option>
                  <option value="notavailable">Not Available</option>
                  <option value="unused">Unused</option>
                  <option value="partialyused">Partialy Used</option>
                  <option value="fullyused">Fully Used</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.conteinerWidthAll}>
        <div className={styles.boxToAlignTitleLearning}>
          <h3>Lesson planing</h3>
          <div className={styles.boxLearning}>
            <label className={styles.labelStandard}>
              LP1 - A lesson plan was provided.
              <select
                onChange={handleInputChange}
                name="grade"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                <option value="belp">Be LP</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label className={styles.labelStandard}>
              LP2- All proposed goals were addressed.
              <select
                onChange={handleInputChange}
                name="grade"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                <option value="totdisagre">Tot. Disagree</option>
                <option value="partdisagree">Part. Disagree</option>
                <option value="neutral">Neutral</option>
                <option value="partagree">Part. Agree</option>
                <option value="totagree">Tot. Agree</option>
              </select>
            </label>
            <label className={styles.labelStandard}>
              LP3 - Resources used contributed to achieved student outcomes.
              <select
                onChange={handleInputChange}
                name="grade"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                <option value="totdisagre">Tot. Disagree</option>
                <option value="partdisagree">Part. Disagree</option>
                <option value="neutral">Neutral</option>
                <option value="partagree">Part. Agree</option>
                <option value="totagree">Tot. Agree</option>
              </select>
            </label>
            <label className={styles.labelStandard}>
              LP4 - Changes to LP positively contributed to achieved student
              outcomes.
              <select
                onChange={handleInputChange}
                name="grade"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                <option value="totdisagre">Tot. Disagree</option>
                <option value="partdisagree">Part. Disagree</option>
                <option value="neutral">Neutral</option>
                <option value="partagree">Part. Agree</option>
                <option value="totagree">Tot. Agree</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.conteinerWidthAll}>
        <div className={styles.boxToAlignTitleLearning}>
          <h3>Final comments</h3>
          <MultilineInputSSR label="Conteúdo" />
        </div>
      </div>

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
          onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
