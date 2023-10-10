import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { PageEnumContratos } from '@/enums';
import { EntitiesEntidadesEscolares } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

class Column<T> {
  constructor(public header: string, public accessor: keyof T) {}
}

type RowData = {
  nome_operacional: any;
  cidade: any;
  acoes: any;
};

const columns: Column<RowData>[] = [
  new Column<RowData>('Nome Operacional', 'nome_operacional'),
  new Column<RowData>('Cidade', 'cidade'),
  new Column<RowData>('Ações', 'acoes'),
];

function useFetchEntidadesEscolares() {
  const [data, setData] = useState<EntitiesEntidadesEscolares[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { setUsersUpdated, usersUpdated, idContrato } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);
        const entidadesEscola = await backendApi.localizarEntidadesEscolares({
          uuid_ec: idContrato,
        });
        setData(entidadesEscola);
        setUsersUpdated(false);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  return { data, loaded, error };
}

function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Entidades Escolares</button>
    </nav>
  );
}

function EntidadesEscolaresTable({ data, loaded, error }: any) {
  return (
    <Table
      data={data}
      columns={columns}
      loaded={loaded}
      error={error}
      searchInputNone={'none'}
      searchInputNoneEscola={'none'}
      labelInput={'Buscar pelo Nome Operacional'}
    />
  );
}

export default function EntidadesEscolares(): JSX.Element {
  const { data, loaded, error } = useFetchEntidadesEscolares();
  const { setPage } = useGlobalContext();

  return (
    <div className={styles.pageContainer}>
      <h4>Contratos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Nova Entidade"
            onClick={() => setPage(PageEnumContratos.novaEntidade)}
          />
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>
        <EntidadesEscolaresTable data={data} loaded={loaded} error={error} />
      </PageContentContainer>
    </div>
  );
}
