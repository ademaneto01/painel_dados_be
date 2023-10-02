import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { PageEnumContratos } from '@/enums';
import { EntitiesContratos } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

class Column<T> {
  constructor(public header: string, public accessor: keyof T) {}
}

type RowData = {
  nome_simplificado: any;
  cnpj_cont: any;
  qtdescolas: any;
  acoes: any;
};

const columns: Column<RowData>[] = [
  new Column<RowData>('Nome Simplificado', 'nome_simplificado'),
  new Column<RowData>('CNPJ', 'cnpj_cont'),
  new Column<RowData>('QTD. Escolas', 'qtdescolas'),
  new Column<RowData>('Ações', 'acoes'),
];

function useFetchContratos() {
  const [data, setData] = useState<EntitiesContratos[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { usersUpdated } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);
        const contratos = await backendApi.localizarContratos();
        setData(contratos);
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
      <button>Entidades Contratuais</button>
    </nav>
  );
}

function ContratosTable({ data, loaded, error, onClickRow }: any) {
  return (
    <Table
      data={data}
      columns={columns}
      loaded={loaded}
      error={error}
      // searchInputNone={'none'}
      // searchInputNoneNome={'none'}
      searchInputNoneEscola={'none'}
      labelInput={'Buscar pelo nome'}
      onClickRow={onClickRow}
    />
  );
}

export default function EntidadesContratuais(): JSX.Element {
  const { data, loaded, error } = useFetchContratos();
  const { setPage, setIdContrato } = useGlobalContext();

  const handleRowClick = (rowData: EntitiesContratos) => {
    setPage(PageEnumContratos.entidadesEscolares);
    setIdContrato(rowData.id);
  };

  return (
    <div className={styles.pageContainer}>
      <h4>Contratos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Novo Contrato"
            onClick={() => setPage(PageEnumContratos.novoContrato)}
          />
        </div>
        <ContratosTable
          data={data}
          loaded={loaded}
          error={error}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </div>
  );
}
