import {
  PageContentContainer,
  CreateButton,
  BackButton,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { PageEnumContratos } from '@/enums';
import { EntitiesDocsEntidade } from '@/entities';
import { BackendApiGet } from '@/backendApi';
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
  const [data, setData] = useState<EntitiesDocsEntidade[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setUsersUpdated, usersUpdated, idEntidadeEscolar } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);
        const docsEntidadeData = await backendApi.listarDocsEntidade(
          idEntidadeEscolar,
        );
        setData(docsEntidadeData);
        setUsersUpdated(false);
      } catch (error: any) {
        setError(true);
        if (error.response.data.mensagem) {
          setMsgError(error.response.data.mensagem);
        } else {
          setMsgError('Ocorreu um erro desconhecido.');
        }
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
      <button>Documentos Entidade</button>
    </nav>
  );
}

function DocsEntidadeTable({ data, loaded, error, msgError }: any) {
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
    />
  );
}

export default function DocsEntidade(): JSX.Element {
  const { data, loaded, error, msgError } = useFetchEntidadesEscolares();
  const { setPage } = useGlobalContext();

  return (
    <div className={styles.pageContainer}>
      <h4>Documentos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            size={'10rem'}
            colorBackGround={'var(--blue-300)'}
            text="Novo Documento"
            onClick={() => setPage(PageEnumContratos.registrarDocEntidade)}
          />
          <BackButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
          />
        </div>
        <DocsEntidadeTable
          data={data}
          loaded={loaded}
          error={error}
          msgError={msgError}
        />
      </PageContentContainer>
    </div>
  );
}
