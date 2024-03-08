import { EntitiesAcompanhamentoPDG } from '@/entities';
import styles from '@/styles/Page.module.css';
import { Column, Table } from '../../../Table';
import { PageContentContainer, CreateButton } from '../../../shared';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { useState, useEffect } from 'react';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import handleApiErrors from '@/utils';

const columns = [
  new Column('Nome Professor', 'nome_agente'),
  new Column('Nome Escola', 'nome_escola'),
  new Column('Série', 'grade'),
  new Column('Cycle', 'cycle'),
  new Column('Ações', 'acoes'),
];

export default function Acompanhamentos() {
  const [data, setData] = useState<EntitiesAcompanhamentoPDG[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { usersUpdated, setUsersUpdated, setPageAcompanhamento } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('userId');
      try {
        const backendApi = new BackendApiGet(`${token}`);

        const users = await backendApi.localizarAcompanhamento(userId);

        setData(users);
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
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
      <h4>Acompanhamento Pedagógico</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--verde-tech)'}
          text="Novo Acompanhamento"
          size="12em"
          onClick={() =>
            setPageAcompanhamento(
              PageEnumAcompanhamentoPDG.registrarAcompanhamento,
            )
          }
        />

        <Table<EntitiesAcompanhamentoPDG>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          msgError={msgError}
          inputSelectAgente={true}
          searchInputNoneEscola={'none'}
          searchInputNone={'none'}
          labelInput={'Buscar'}
        />
      </PageContentContainer>
    </div>
  );
}
