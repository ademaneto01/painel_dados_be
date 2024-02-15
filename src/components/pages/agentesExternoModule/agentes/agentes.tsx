import { EntitiesAgenteExterno } from '@/entities';
import styles from '@/styles/Page.module.css';
import { Column, Table } from '../../../Table';
import { PageContentContainer, CreateButton } from '../../../shared';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { useState, useEffect, useMemo } from 'react';
import { PageEnumAgentesExterno } from '@/enums';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Cargo', 'cargo'),
  new Column('E-mail Primário', 'no_email_primario'),
  new Column('Ações', 'acoes'),
];

export default function AgentesExterno() {
  const [data, setData] = useState<EntitiesAgenteExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { usersUpdated, setUsersUpdated, setPageAgentesExterno } =
    useGlobalContext();

  const processAgenteData = (agentesData: EntitiesAgenteExterno[]) => {
    return agentesData.map((agentes) => new EntitiesAgenteExterno(agentes));
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return;
      }
      try {
        const backendApi = new BackendApiGet(token);
        const agentes = await backendApi.listarTodosAgentes();
        const agentesData = agentes.map((a) => new EntitiesAgenteExterno(a));
        setIsDataLoaded(true);
        setData(agentesData);
      } catch (error: any) {
        setError(true);
        setMsgError(
          error.response?.data?.mensagem || 'Ocorreu um erro desconhecido.',
        );
      } finally {
        setLoaded(true);
        setUsersUpdated(false);
      }
    }
    if (!loaded || usersUpdated) {
      fetchData();
    }
  }, [data]);

  const agentesMemo = useMemo(() => processAgenteData(data), [data]);

  return (
    <div className={styles.pageContainer}>
      <h4>Agentes Externos</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--verde-tech)'}
          text="Novo Agente"
          onClick={() =>
            setPageAgentesExterno(PageEnumAgentesExterno.registrarAgente)
          }
        />

        <Table<EntitiesAgenteExterno>
          data={agentesMemo}
          columns={columns}
          isDataLoaded={isDataLoaded}
          loaded={loaded}
          error={error}
          msgError={msgError}
          inputSelectAgente={true}
          searchInputNoneEscola={'none'}
          labelInput={'Buscar pelo nome'}
        />
      </PageContentContainer>
    </div>
  );
}
