import React, { useState, useEffect } from 'react';
import { PageEnumContratos } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { PageContentContainer, BackButton, CheckboxGroup, InputSelect } from '@/components/shared';
import { BackendApiPost, BackendApiGet } from '@/backendApi';
import handleApiErrors from '@/utils/HandleApiErrors';
import styles from '@/styles/RegistrarOcorrenciaPDG.module.css';
import { EntitiesVinculosAgentesExterno } from '@/entities';
import { ErrorComponent } from '@/errors/index';
import { SuccessComponent } from '@/success/index';

export default function RegistrarOcorrencia(): JSX.Element {
  const [data, setData] = useState<EntitiesVinculosAgentesExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedCanal, setSelectedCanal] = useState<string>('');
  const [selectedTipo, setSelectedTipo] = useState<string>('');   
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [ocorrencia, setOcorrencia] = useState<string>('');
  const { setPage, idEntidadeEscolar } = useGlobalContext();
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [messageSucesso, setMessageSucesso] = useState('');
  const [confidencial, setConfidencial] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);
        const agentesEscola = await backendApi.listarAgenteRelacionadoEscola(idEntidadeEscolar);
        setData(agentesEscola);
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, [idEntidadeEscolar]);

  const fetchDataForSubmit = async (ocorrencia: string, idEntidadeEscolar: string, confidencial: string, tipo: string, canal: string) => {
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('userId');
    const backendApi = new BackendApiPost(`${token}`);
    const bodyReq = {
      id_ee: idEntidadeEscolar,
      texto_ocorrencia: ocorrencia,
      user_escola: selectedOptions,
      id_user: user_id,
      confidencial: confidencial,
      tipo: tipo,
      canal: canal,
    };
    try {
      await backendApi.registrarOcorrenciaPDG(bodyReq);
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    }
  };

  const HeaderComponent: React.FC = () => <h4>Registrar Ocorrência</h4>;

  const handleSubmit = () => {
    if (ocorrencia.trim() && selectedOptions.length > 0) {
      fetchDataForSubmit(ocorrencia, idEntidadeEscolar, confidencial.toString(), selectedTipo, selectedCanal);
      setSucesso(true);
      setMessageSucesso('Ocorrência registrada com sucesso!');
      setTimeout(() => {
        setPage(PageEnumContratos.entidadesEscolares);
      }, 600);
    } else {
      setError(true);
      setMsgError('Por favor, preencha a ocorrência e selecione pelo menos um agente relacionado.');
    }
  };

  const canal = [
    { value: 'econtroPresencial', label: 'Econtro Presencial' },
    { value: 'encontroOnline', label: 'Encontro Online' },
    { value: 'email', label: 'E-mail' },
    { value: 'whatsapp', label: 'Whatsapp' },
    { value: 'telefone', label: 'Telefone' },
    { value: 'documentoDigital', label: 'Documento Digital' },
    { value: 'outro', label: 'Outro' },
  ];

  const tipo = [
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'logistica', label: 'Logística' },
    { value: 'acesso_plataformas', label: 'Acesso Plataformas' },
    { value: 'singularidades', label: 'Singularidades' },
    { value: 'pequenos_exploradores', label: 'Pequenos Exploradores' },
    { value: 'gestao_contratos', label: 'Gestão contratos' },
    { value: 'negociacao', label: 'Negociação' },
    { value: 'eventos_ngl', label: 'Eventos em parceria com NGL' },
    { value: 'formacao_continuada', label: 'Formação continuada' },
    { value: 'acoes_regua_relacionamento', label: 'Ações régua de relacionamento' },
    { value: 'entrega_placa_be', label: 'Entrega de placa Be' },
    { value: 'jovens_exploradores', label: 'Jovens exploradores' },
    { value: 'be_day', label: 'Be Day' },
    { value: 'exames_cambridge', label: 'Exames de Cambridge' },
    { value: 'placement_test', label: 'Placement Test' },
    { value: 'participacao_evento_escolar', label: 'Participação de evento escolar' },
    { value: 'plantao_duvidas', label: 'Plantão de dúvidas' },
    { value: 'passagem_bastao', label: 'Passagem de bastão' },
    { value: 'visita_presencial_cs', label: 'Visita presencial CS' },
    { value: 'reuniao_alinhamento', label: 'Reunião de alinhamento' },
    { value: 'visita_escola_be', label: 'Visita da escola ao Be' },
    { value: 'questoes_financeiras', label: 'Questões financeiras' },
    { value: 'envio_brindes', label: 'Envio de brindes' },
    { value: 'solicitacoes_diversas', label: 'Solicitações diversas' },
  ];

  const handleSelectInputCanal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCanal(event.target.value);
  };

  const handleSelectInputTipo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTipo(event.target.value);
  };

  const handleSelectChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleConfidencial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfidencial(event.target.checked);
  };

  const agenteOptions = data.map((agente) => ({
    value: agente.uuid_agente.toString(),
    label: agente.nome,
  }));

  return (
    <div>
      <HeaderComponent />
      <PageContentContainer>
        <BackButton
          color={'var(--gray-300)'}
          colorBackGround={'var(--white)'}
          text="Voltar"
          size="8rem"
          onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
        />
        <form id="registroOcorrencia">
        <label htmlFor="agentes" >Agentes Relacionados:</label>
        <div className={styles.spacer}></div>
        <CheckboxGroup
          options={agenteOptions}
          selectedOptions={selectedOptions}
          onChange={handleSelectChange}
        />
        <div className={styles.spacer2}></div>
          <div className={styles.selectContainer}>
            <InputSelect
              label="Canal:"
              name="opcoes"
              value={selectedCanal}
              onChange={handleSelectInputCanal}
              options={canal}
              />
            </div>
        <div className={styles.spacer}></div>
          <div className={styles.selectContainer}>
            <InputSelect
              label="Tipo:"
              name="opcoes"
              value={selectedTipo}
              onChange={handleSelectInputTipo}
              options={tipo}
            />
          </div>
          <div className={styles.confidential}>
            <label htmlFor="checkbox">Confidencial:   </label>
            <input
              type="checkbox"
              id="checkbox"
              checked={confidencial}
              onChange={handleConfidencial}
            />
          </div>
          <textarea
            className={styles.textArea}
            value={ocorrencia}
            onChange={(e) => setOcorrencia(e.target.value)}
            placeholder="Descreva a ocorrência"
            rows={5}
          />
          {sucesso && <SuccessComponent message={messageSucesso} />}
          {error && <ErrorComponent message={msgError} />}
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
              onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </PageContentContainer>
    </div>
  )
};
