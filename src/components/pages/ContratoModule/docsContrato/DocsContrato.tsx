import {
  PageContentContainer,
  CreateButton,
  BackButton,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { PageEnumContratos } from '@/enums';
import { EntitiesDocsContrato } from '@/entities';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import handleApiErrors from '@/utils/HandleApiErrors';

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
  const [msgError, setMsgError] = useState('');
  const { setUsersUpdated, usersUpdated, idContrato } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);
        const docsContratoData = await backendApi.listarDocsContrato(
          idContrato,
        );

        setData(docsContratoData);
        setUsersUpdated(false);
      } catch (error: any) {
        setUsersUpdated(false);
        handleApiErrors(error, setError, setMsgError);
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  return { data, loaded, error, msgError };
}

function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Documentos do Contrato</button>
    </nav>
  );
}

function DocsContratoTable({ data, loaded, error, msgError, onClickRow }: any) {
  return (
    <Table
      data={data}
      columns={columns}
      loaded={loaded}
      error={error}
      msgError={msgError}
      searchInputNone={'none'}
      searchInputNoneEscola={'none'}
      searchInputNoneNome={'none'}
      onClickRow={onClickRow}
    />
  );
}

export default function DocsContrato(): JSX.Element {
  const { data, loaded, error, msgError } = useFetchEntidadesEscolares();
  const { setPage } = useGlobalContext();

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
          <BackButton
            color={'var(--gray-300)'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>

        <DocsContratoTable
          data={data}
          loaded={loaded}
          msgError={msgError}
          error={error}
        />
      </PageContentContainer>
    </div>
  );
}
