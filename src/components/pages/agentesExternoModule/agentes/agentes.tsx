import { EntitiesTeste } from '@/entities';
import styles from '@/styles/Page.module.css';
import { Column, Table } from '../../../Table';
import { PageContentContainer, CreateButton } from '../../../shared';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { FailedToFetchError } from '@/errors';
import { useState, useEffect } from 'react';
import { PageEnumAgentesExterno } from '@/enums';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Cargo', 'cargo'),
  new Column('E-mail Primário', 'no_email_primario'),
  new Column('Ações', 'acoes'),
];

export default function AgentesExterno() {
  const [data, setData] = useState<EntitiesTeste[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { usersUpdated, setUsersUpdated, setPageAgentesExterno } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);

        const users = await backendApi.listarTodosAgentes();

        setData(users);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
        setUsersUpdated(false);
      }
    }
    if (!loaded || usersUpdated) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  return (
    <div className={styles.pageContainer}>
      <h4>Agentes Externo</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--verde-tech)'}
          text="Novo Agente"
          onClick={() =>
            setPageAgentesExterno(PageEnumAgentesExterno.registrarAgente)
          }
        />

        <Table<EntitiesTeste>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          inputSelectAgente={true}
          searchInputNoneEscola={'none'}
          labelInput={'Buscar pelo nome'}
        />
      </PageContentContainer>
    </div>
  );
}
