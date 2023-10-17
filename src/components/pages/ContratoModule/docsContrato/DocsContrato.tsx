import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { PageEnumContratos } from '@/enums';
import { EntitiesDocsContrato } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

class Column<T> {
  constructor(public header: string, public accessor: keyof T) {}
}

type RowData = {
  nome_doc: any;
  acoes: any;
};

const columns: Column<RowData>[] = [
  new Column<RowData>('Nome', 'nome_doc'),
  new Column<RowData>('Ações', 'acoes'),
];

function useFetchEntidadesEscolares() {
  const [data, setData] = useState<EntitiesDocsContrato[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { setUsersUpdated, usersUpdated, idContrato } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);
        const docsContratoData = await backendApi.listarDocsContrato({
          uuid_ec: idContrato,
        });
        setData(docsContratoData);
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
      <button>Documentos do Contrato</button>
    </nav>
  );
}

function DocsContratoTable({ data, loaded, error, onClickRow }: any) {
  return (
    <Table
      data={data}
      columns={columns}
      loaded={loaded}
      error={error}
      searchInputNone={'none'}
      searchInputNoneEscola={'none'}
      searchInputNoneNome={'none'}
      onClickRow={onClickRow}
    />
  );
}

export default function DocsContrato(): JSX.Element {
  const { data, loaded, error } = useFetchEntidadesEscolares();
  const { setPage } = useGlobalContext();

  const handleRowClick = (rowData: EntitiesDocsContrato) => {
    console.log(rowData.id);
  };

  return (
    <div className={styles.pageContainer}>
      <h4>Contratos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            size={'10rem'}
            colorBackGround={'var(--verde-tech)'}
            text="Novo Documento"
            onClick={() => setPage(PageEnumContratos.registrarDoc)}
          />
          <CreateButton
            color={'var(--gray-300)'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>
        <DocsContratoTable
          onClickRow={handleRowClick}
          data={data}
          loaded={loaded}
          error={error}
        />
      </PageContentContainer>
    </div>
  );
}
