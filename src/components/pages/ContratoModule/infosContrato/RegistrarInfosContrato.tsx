import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { PageEnumEscolasPDG } from '@/enums';
import { useGlobalContext } from '@/context/store';
import { PageContentContainer, BackButton } from '@/components/shared';
import { BackendApiPost, BackendApiGet } from '@/backendApi';
import handleApiErrors from '@/utils/HandleApiErrors';
import styles from '@/styles/RegistrarOcorrenciaPDG.module.css';
import { EntitiesAgenteExterno } from '@/entities';

interface Option {
  value: string;
  label: string;
}

export default function RegistrarOcorrenciaPDG(): JSX.Element {
  const [data, setData] = useState<EntitiesAgenteExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [ocorrencia, setOcorrencia] = useState<string>('');
  const { setPageEscolasPDG, idEntidadeEscolar } = useGlobalContext();
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(token);
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

  const fetchDataForSubmit = async (texto_ocorrencia: string, user_escola: string) => {
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('userId');
    const backendApi = new BackendApiPost(token);
    const bodyReq = {
      id_ee: idEntidadeEscolar,
      texto_ocorrencia,
      user_escola,
      id_user: user_id,
    };

    try {
      await backendApi.createOcorrencia(bodyReq);
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    }
  };

  const handleSubmit = () => {
    if (ocorrencia.trim()) {
      fetchDataForSubmit(ocorrencia, idEntidadeEscolar);
    } else {
      setError(true);
      setMsgError('Por favor, preencha a ocorrência.');
    }
  };

  const handleSelectChange = (selectedOptions: Option[]) => {
    setSelectedOptions(selectedOptions);
  };

  const agenteOptions = data.map((agente) => ({
    value: agente.id.toString(),
    label: agente.nome,
  }));

  return (
    <div>
      <h1>Registrar Ocorrência</h1>
      <PageContentContainer>
        <form>
          <div className={styles.selectContainer}>
            <label htmlFor="agentes">Agentes Relacionados:</label>
            <Select
              isMulti
              id="agentes"
              name="agentes"
              options={agenteOptions}
              value={selectedOptions}
              onChange={handleSelectChange}
              className={styles.inputSelectReact}
            />
          </div>
          <textarea
            className={styles.textArea}
            value={ocorrencia}
            onChange={(e) => setOcorrencia(e.target.value)}
            placeholder="Descreva a ocorrência"
            rows={5}
          />
          {error && <p className={styles.error}>{msgError}</p>}
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
              onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.escolasPDG)}
            >
              Cancelar
            </button>
            <BackButton
              color={'var(--gray-300)'}
              colorBackGround={'var(--white)'}
              text="Voltar"
              size="8rem"
              onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.escolasPDG)}
            />
          </div>
        </form>
      </PageContentContainer>
    </div>
  );
}
