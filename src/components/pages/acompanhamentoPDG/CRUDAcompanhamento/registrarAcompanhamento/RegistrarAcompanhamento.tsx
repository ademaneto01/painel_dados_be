import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import ReactSlider from 'react-slider';
import Image from 'next/image';
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
import { IconBaseProps, IconType } from 'react-icons';
import { ComponenteCalendar } from '@/components/pages/calendar';

interface FormData {
  id: string;
  nome_operacional: string;
}
interface FormDataToSubmit {
  nome_escola: string;
  nameSearch: string;
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
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormDataToSubmit[]>(
    [],
  );
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
        await backendApi.registrarAcompanhamento(novoForm);
      } catch (error) {
        handleApiErrors(error);
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
      } catch (error) {
        handleApiErrors(error);
      }
    }
    setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos);
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
  });

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
    setFormDataToSubmit((prev) => ({ ...prev, [name]: value }));
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
    setIsFinalize('finalize');
  };

  const handleSalvarClick = (e: any) => {
    e.preventDefault();
    setIsFinalize('save');
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
          <button
            className={styles.cancelButton}
            type="button"
            onClick={() =>
              setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos)
            }
          >
            Cancelar
          </button>
        </div>
      </form>
      <button
        className={styles.btnToogleClose}
        onClick={() => {
          toggleSideNavBar();
        }}
      >
        {'>'}
      </button>
      <div className={containerClass}>
        <div className={boxRanges}>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
          <label className={inputRangeClass}>
            <ReactSlider
              className={styles.slider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              onBeforeChange={(value: any, index: any) =>
                console.log(
                  `onBeforeChange: ${JSON.stringify({ value, index })}`,
                )
              }
              onChange={(value: any, index: any) =>
                console.log(`onChange: ${JSON.stringify({ value, index })}`)
              }
              onAfterChange={(value: any, index: any) =>
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`,
                )
              }
              renderThumb={(props: any, state: any) => <div {...props}></div>}
            />
            <Image
              className={styles.logo}
              src="/termometro.png"
              alt="Beyond by Be"
              priority={true}
              width={192}
              height={15}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
