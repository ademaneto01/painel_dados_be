import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import ReactSlider from 'react-slider';
import styles from '@/styles/AcompanhamentoPDG.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import InputMask from 'react-input-mask';
import { ErrorComponent } from '@/errors/index';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import dynamic from 'next/dynamic';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { IconBaseProps, IconType } from 'react-icons';
import { ComponenteCalendar } from '@/components/pages/calendar';
import handleApiErrors from '@/utils/HandleApiErrors';

interface FormData {
  id: string;
  nome_operacional: string;
}
interface FormDataToSubmit {
  nome_escola: string;
  nameSearch: string;
  nome_agente: string;
  educatorsname: string;
  dataofobservation: string;
  grade: string;
  ofstudents: string;
  tema: string;
  lessonplanbe: string;
  cycle: string;
  digitalprojector: string;
  board: string;
  englishcorner: string;
  noiselevel: string;
  resourceaudioqlty: string;
  nglbematerials: string;
  lp1lessonplan: string;
  lp2proposedgoals: string;
  lp3resourcesused: string;
  lp4changes: string;
  finalcoments: string;
}

interface FormDataCriteriaToSubmit {
  id: string;
  id_acmp: string;
  e1: number;
  e2: number;
  e3: number;
  e4: number;
  e5: number;
  e6: number;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
  m6: number;
  l1: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
  l6: number;
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
  const calendarRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [avaliationPage, setAvaliationPage] = useState(false);
  const [isFinalize, setIsFinalize] = useState('');
  const [yearObservation, setYearObservation] = useState(
    'Enter a year in observation date',
  );
  const [entidadesEscolares, setEntidadesEscolares] = useState<FormData[]>([]);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormDataToSubmit>({
    nome_escola: '',
    nameSearch: '',
    nome_agente: '',
    educatorsname: '',
    dataofobservation: '',
    grade: '',
    ofstudents: '',
    tema: '',
    lessonplanbe: '',
    cycle: '',
    digitalprojector: '',
    board: '',
    englishcorner: '',
    noiselevel: '',
    resourceaudioqlty: '',
    nglbematerials: '',
    lp1lessonplan: '',
    lp2proposedgoals: '',
    lp3resourcesused: '',
    lp4changes: '',
    finalcoments: '',
  });
  const [formDataCriteriaToSubmit, setFormDataCriteriaToSubmit] =
    useState<FormDataCriteriaToSubmit>({
      id: '',
      id_acmp: '',
      e1: 0,
      e2: 0,
      e3: 0,
      e4: 0,
      e5: 0,
      e6: 0,
      m1: 0,
      m2: 0,
      m3: 0,
      m4: 0,
      m5: 0,
      m6: 0,
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 0,
      l6: 0,
    });
  const [agentesExternoData, setAgentesExternoData] = useState<
    FormDataAgenteExternoRelacionado[]
  >([]);
  const { setPageAcompanhamento } = useGlobalContext();

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1em',
      color: color,
    };

    return icon(options);
  }

  const fetchDataRegister = async (estado: string) => {
    const userId = localStorage.getItem('userId');
    if (estado === 'finalized') {
      const novoForm = {
        ...formDataToSubmit,
        finalized: true,
        finalizedtimestamp: new Date(),
        userId,
      };
      try {
        const token = localStorage.getItem('auth_token');
        const backendApi = new BackendApiPost(`${token}`);
        const response = await backendApi.registrarAcompanhamento(novoForm);

        if (response && response[0] && response[0].id) {
          const formCriteria = {
            ...formDataCriteriaToSubmit,
            id_acmp: response[0].id,
            finalized: true,
            finalizedtimestamp: new Date(),
          };

          await backendApi.registrarAcompanhamentoCriteria(formCriteria);

          setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos);
        } else {
          setError(true);
          setMsgError(
            'Ocorreu um erro ao tentar vincular as notas de critério. Por favor, entre em contato com o suporte técnico fornecendo detalhes sobre os passos que levaram a este erro.',
          );
        }
      } catch (error) {
        handleApiErrors(error, setError, setMsgError);
      }
    }
    if (estado === 'save') {
      const novoForm = {
        ...formDataToSubmit,
        finalized: false,
        finalizedtimestamp: null,
        userId,
      };
      try {
        const token = localStorage.getItem('auth_token');
        const backendApi = new BackendApiPost(`${token}`);
        const response = await backendApi.registrarAcompanhamento(novoForm);

        if (response && response[0] && response[0].id) {
          const formCriteria = {
            ...formDataCriteriaToSubmit,
            id_acmp: response[0].id,
            finalized: false,
            finalizedtimestamp: null,
          };

          await backendApi.registrarAcompanhamentoCriteria(formCriteria);

          setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos);
        } else {
          setError(true);
          setMsgError(
            'Ocorreu um erro ao tentar vincular as notas de critério. Por favor, entre em contato com o suporte técnico fornecendo detalhes sobre os passos que levaram a este erro.',
          );
        }
      } catch (error) {
        handleApiErrors(error, setError, setMsgError);
      }
    }
  };

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
      handleApiErrors(error, setError, setMsgError);
    }
  };

  const fetchAgentesExterno = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.listarAgentesRelacionadoEscolaIsProf(
        id,
      );
      setAgentesExternoData(
        response.map((agentesExterno) => ({
          uuid_agente: agentesExterno.uuid_agente,
          nome: agentesExterno.nome,
        })),
      );
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
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
    if (name === 'educatorsname') {
      const selectedAgent = agentesExternoData.find(
        (agent) => agent.uuid_agente === value,
      );

      setFormDataToSubmit((prev) => ({
        ...prev,
        educatorsname: value,
        nome_agente: selectedAgent ? selectedAgent.nome : '',
      }));
    } else {
      setFormDataToSubmit((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuillChange = (content: string) => {
    setFormDataToSubmit((prevFormData) => ({
      ...prevFormData,
      finalcoments: content,
    }));
  };

  const handleDateChange = (newDate: Date | Date[] | null) => {
    let formattedDate = '';

    if (newDate instanceof Date) {
      formattedDate = newDate.toLocaleDateString('en-CA');
    } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
      formattedDate = newDate[0].toLocaleDateString('en-CA');
    }

    setFormDataToSubmit((prevFormData) => ({
      ...prevFormData,
      dataofobservation: formattedDate,
    }));
  };

  const handleSliderChange = (fieldName: string, value: number) => {
    setFormDataCriteriaToSubmit((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (Object.values(formDataToSubmit).some((v) => v === '' || v === null)) {
      errors.push('Todos os campos são obrigatórios.');
    }

    if (errors.length) {
      setError(true);
      setMsgError(errors.join(' '));
      setTimeout(() => setError(false), 6000);
      return false;
    }
    return true;
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
    if (isFinalize !== '') {
      if (isFinalize === 'finalize') {
        fetchDataRegister('finalized');
      }

      if (isFinalize === 'save') {
        fetchDataRegister('save');
      }
    }
  }, [isFinalize]);

  const handleFinalizarClick = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFinalize('finalize');
    }
  };

  const handleSalvarClick = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFinalize('save');
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef]);

  const handleOptionSelect = (option: FormData) => {
    setNameSearch(option.nome_operacional);
    setFormDataToSubmit((prevFormData) => ({
      ...prevFormData,
      nameSearch: option.id,
      nome_escola: option.nome_operacional,
    }));
    fetchAgentesExterno(option.id);
    setShowOptions(true);
  };

  const containerClass = expandable(styles.conteinerForm);
  const inputRangeClass = expandableInputRange(styles.inputRange);
  const boxRanges = expandableBoxRanges(styles.rangesClass);
  function expandableInputRange(style: string): string {
    return style + (!avaliationPage ? ` ${styles.expandedRange}` : '');
  }
  function expandableBoxRanges(style: string): string {
    return style + (!avaliationPage ? ` ${styles.expandeBoxRanges}` : '');
  }

  function expandable(style: string): string {
    return (
      style + (avaliationPage ? ` ${styles.expanded}` : `${styles.notExpanded}`)
    );
  }
  function toggleSideNavBar(): void {
    setAvaliationPage(!avaliationPage);
  }

  const filteredOptions = entidadesEscolares.filter((entidade) =>
    entidade.nome_operacional.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPageAcompanhamento={setPageAcompanhamento} />
        <FormComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPageAcompanhamento={setPageAcompanhamento}
          handleOptionSelect={handleOptionSelect}
          setShowOptions={setShowOptions}
          showOptions={showOptions}
          filteredOptions={filteredOptions}
          handleSearchChange={handleSearchChange}
          nameSearch={nameSearch}
          handleInputChange={handleInputChange}
          handleSliderChange={handleSliderChange}
          entidadesEscolares={entidadesEscolares}
          agentesExternoData={agentesExternoData}
          yearObservation={yearObservation}
          containerRef={containerRef}
          renderIcon={renderIcon}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          calendarRef={calendarRef}
          handleDateChange={handleDateChange}
          setYearObservation={setYearObservation}
          formDataToSubmit={formDataToSubmit}
          handleQuillChange={handleQuillChange}
          handleFinalizarClick={handleFinalizarClick}
          handleSalvarClick={handleSalvarClick}
          containerClass={containerClass}
          toggleSideNavBar={toggleSideNavBar}
          inputRangeClass={inputRangeClass}
          ReactSlider={ReactSlider}
          boxRanges={boxRanges}
          avaliationPage={avaliationPage}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Novo Acompanhamento</h4>;

const NavigationButtons: React.FC<{
  setPageAcompanhamento: React.Dispatch<
    React.SetStateAction<PageEnumAcompanhamentoPDG>
  >;
}> = ({ setPageAcompanhamento }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() =>
        setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos)
      }
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  setPageAcompanhamento,
  agentesExternoData,
  yearObservation,
  handleInputChange,
  handleSliderChange,
  filteredOptions,
  searchTerm,
  nameSearch,
  setShowOptions,
  showOptions,
  handleSearchChange,
  handleOptionSelect,
  containerRef,
  renderIcon,
  showCalendar,
  setShowCalendar,
  calendarRef,
  handleDateChange,
  setYearObservation,
  formDataToSubmit,
  handleQuillChange,
  handleFinalizarClick,
  handleSalvarClick,
  containerClass,
  toggleSideNavBar,
  inputRangeClass,
  boxRanges,
  ReactSlider,
  avaliationPage,
}) => {
  return (
    <div className={styles.boxToHiddenForms}>
      <form className={styles.conteinerForm}>
        <div className={styles.boxStatus}>
          <label className={styles.labelStandard}>
            Partner school
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
              value={formDataToSubmit.educatorsname}
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
            <div
              onClick={() => {
                setShowCalendar(true);
              }}
              className={styles.divDataObsertavion}
            >
              <InputMask
                type="text"
                placeholder="YYYY/MM/DD"
                mask="9999/99/99"
                readOnly
                name="dataofobservation"
                value={formDataToSubmit.dataofobservation}
                className={styles.inputDataObservation}
              />
              {renderIcon(FaCalendarAlt)}
            </div>
            <div className={styles.flexContainer} ref={calendarRef}>
              {showCalendar && (
                <ComponenteCalendar
                  onChange={handleDateChange}
                  setYearObservation={setYearObservation}
                />
              )}
            </div>
          </label>
        </div>
        <div className={styles.conteinerWidthAll}>
          <h3>Cycle</h3>
          <label className={styles.labelStandard}>
            Grade
            <select
              onChange={handleInputChange}
              name="grade"
              value={formDataToSubmit.grade}
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
              onChange={handleInputChange}
              name="ofstudents"
              value={formDataToSubmit.ofstudents}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Subject
            <select
              onChange={handleInputChange}
              name="tema"
              value={formDataToSubmit.tema}
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
              name="lessonplanbe"
              onChange={handleInputChange}
              value={formDataToSubmit.lessonplanbe}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Cycle
            <select
              onChange={handleInputChange}
              name="cycle"
              value={formDataToSubmit.cycle}
              className={styles.inputSelect}
            >
              <option value="">-</option>
              {yearObservation !== 'Enter a year in observation date' ? (
                <>
                  <option
                    value={`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.1`}
                  >
                    {`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.1`}
                  </option>
                  <option
                    value={`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.2`}
                  >
                    {`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.2`}
                  </option>
                  <option
                    value={`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.3`}
                  >
                    {`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.3`}
                  </option>
                  <option
                    value={`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.4`}
                  >
                    {`${yearObservation
                      .toLocaleDateString('en-CA')
                      .substring(0, 4)}.4`}
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
                    value={formDataToSubmit.digitalprojector}
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
                    value={formDataToSubmit.board}
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
                    value={formDataToSubmit.englishcorner}
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
                    value={formDataToSubmit.noiselevel}
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
                    value={formDataToSubmit.resourceaudioqlty}
                    className={styles.inputSelect}
                  >
                    <option value="">-</option>
                    <option value="N/A">N/A</option>
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
                    value={formDataToSubmit.nglbematerials}
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
                  name="lp1lessonplan"
                  value={formDataToSubmit.lp1lessonplan}
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
                  name="lp2proposedgoals"
                  value={formDataToSubmit.lp2proposedgoals}
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
                  name="lp3resourcesused"
                  value={formDataToSubmit.lp3resourcesused}
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
                  name="lp4changes"
                  value={formDataToSubmit.lp4changes}
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
            <MultilineInputSSR
              label="Conteúdo"
              onChange={handleQuillChange}
              value={formDataToSubmit.finalcoments}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={() =>
              setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos)
            }
          >
            Cancelar
          </button>
          <button
            className={styles.confirmButtonFinal}
            type="button"
            onClick={handleFinalizarClick}
          >
            Finalizar
          </button>
          <button
            className={styles.confirmButton}
            type="button"
            onClick={handleSalvarClick}
          >
            Salvar
          </button>
        </div>
      </form>
      <button
        className={styles.btnToogleClose}
        onClick={() => {
          toggleSideNavBar();
        }}
      >
        {avaliationPage
          ? renderIcon(AiOutlineRight)
          : renderIcon(AiOutlineLeft)}
      </button>
      <div className={containerClass}>
        <div className={boxRanges}>
          <label className={inputRangeClass}>
            E1 - Communicates clearly, especialy when giving instruction.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e1', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            E2 - Promotes an appropriate degree of autonomy and self-efficacy.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e2', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            E3 - Provides feedback and promotes peer feedback practices
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e3', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            E4 - Has good rapport with the group.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e4', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            E5 - Ensures learners are aware of learning goals.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e5', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            E6 - Engages with and handles emergent content effectively.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('e6', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M1 - Modelled throughout the lesson.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m1', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M2 - Outlined, summarized or transformed strategically.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m2', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M3 - Organized, structured or related visually.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m3', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M4 - Integrated with learners' prior knowledge.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m4', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M5 - Presented or explained through relevant/meaningful examples for
            learning context.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m5', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            M6 - Presented progressively, generating a positive lesson flow.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('m6', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L1 - Cooperate during the lesson, occasionaly engaging in peer
            learning practices.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l1', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L2 - Approach practice opportunities deliberately.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l2', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L3 - Verbalize their questions and thoughts, seeking help when
            needed.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l3', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L4 - Act as a cohesive group, fostering a positive learning climate.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l4', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L5 - Reflect on and evaluate their learning.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l5', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
          <label className={inputRangeClass}>
            L6 - Appear engaged throughout the lesson.
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              min={-1}
              max={1}
              step={0.02}
              onAfterChange={(value: any) => handleSliderChange('l6', value)}
              renderThumb={(props: any, state: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps}></div>;
              }}
            />
            <div className={styles.logoCSS} />
          </label>
        </div>
      </div>
    </div>
  );
};
