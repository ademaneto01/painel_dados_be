import React, { useState, useEffect } from 'react';
import { PageEnumContratos } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { PageContentContainer, BackButton, CheckboxGroup } from '@/components/shared';
import { BackendApiPost, BackendApiGet } from '@/backendApi';
import handleApiErrors from '@/utils/HandleApiErrors';
import styles from '@/styles/RegistrarOcorrenciaPDG.module.css';
import { EntitiesVinculosAgentesExterno } from '@/entities';
import { ErrorComponent } from '@/errors/index';
import { SuccessComponent } from '@/success/index';

export default function RegistrarOcorrenciaPDG(): JSX.Element {
  const [data, setData] = useState<EntitiesVinculosAgentesExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [ocorrencia, setOcorrencia] = useState<string>('');
  const { setPage, idEntidadeEscolar } = useGlobalContext();
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [messageSucesso, setMessageSucesso] = useState('');

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

  const fetchDataForSubmit = async (ocorrencia: string, idEntidadeEscolar: string) => {
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('userId');
    const backendApi = new BackendApiPost(`${token}`);
    const bodyReq = {
      id_ee: idEntidadeEscolar,
      texto_ocorrencia: ocorrencia,
      user_escola: selectedOptions,
      id_user: user_id,
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
      fetchDataForSubmit(ocorrencia, idEntidadeEscolar);
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

  const handleSelectChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
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
        <form>
        <label htmlFor="agentes" >Agentes Relacionados:</label>
        <CheckboxGroup
          options={agenteOptions}
          selectedOptions={selectedOptions}
          onChange={handleSelectChange}
        />
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
  );
}
