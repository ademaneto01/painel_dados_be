import { EntitiesAgenteExterno } from '@/entities';
import styles from '@/styles/Page.module.css';
import { Column, Table } from '../../../../Table';
import { PageContentContainer, CreateButton } from '../../../../shared';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { useState, useEffect } from 'react';
import { PageEnumAcompanhamentoPDG } from '@/enums';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Cargo', 'cargo'),
  new Column('E-mail Primário', 'no_email_primario'),
  new Column('Ações', 'acoes'),
];

export default function Acompanhamentos() {
  const [data, setData] = useState<EntitiesAgenteExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { usersUpdated, setUsersUpdated, setPageAcompanhamento } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);

        const users = await backendApi.listarTodosAgentes();

        setData(users);
      } catch (error: any) {
        setError(true);
        if (error.response.data.mensagem) {
          setMsgError(error.response.data.mensagem);
        } else {
          setMsgError('Ocorreu um erro desconhecido.');
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

        <Table<EntitiesAgenteExterno>
          data={data}
          columns={columns}
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
