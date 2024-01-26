import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { PageEnumContratos } from '@/enums';
import { EntitiesContratos } from '@/entities';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ModalSucesso } from '../../../modal';

class Column<T> {
  constructor(public header: string, public accessor: keyof T) {}
}

type RowData = {
  nome_simplificado: any;
  cnpj_cont: any;
  qtdescolas: any;
  acoes: any;
  active: any;
};

const columns: Column<RowData>[] = [
  new Column<RowData>('Nome Simplificado', 'nome_simplificado'),
  new Column<RowData>('CNPJ', 'cnpj_cont'),
  new Column<RowData>('QTD. Escolas', 'qtdescolas'),
  new Column<RowData>('Ações', 'acoes'),
  new Column<RowData>('Ativo', 'active'),
];

function useFetchContratos() {
  const [data, setData] = useState<EntitiesContratos[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setContractOrEntidadeUpdated, contractOrEntidadeUpdated } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);
        const contratos = await backendApi.localizarContratos();
        setData(contratos);
        setContractOrEntidadeUpdated(false);
      } catch (error: any) {
        setContractOrEntidadeUpdated(false);
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
  }, [loaded, contractOrEntidadeUpdated]);

  return { data, loaded, error, msgError };
}

function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Entidades Contratuais</button>
    </nav>
  );
}

function ContratosTable({ data, loaded, error, msgError, onClickRow }: any) {
  return (
    <Table
      data={data}
      columns={columns}
      loaded={loaded}
      error={error}
      msgError={msgError}
      searchInputNone={'none'}
      searchInputNoneEscola={'none'}
      labelInput={'Buscar pelo Nome'}
      onClickRow={onClickRow}
    />
  );
}

export default function EntidadesContratuais(): JSX.Element {
  const { data, loaded, error, msgError } = useFetchContratos();
  const { setPage, setIdContrato, usersUpdated } = useGlobalContext();

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
        {usersUpdated && (
          <ModalSucesso
            message={'Status do contrato alterado com sucesso...'}
          />
        )}
        <ContratosTable
          data={data}
          loaded={loaded}
          error={error}
          msgError={msgError}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </div>
  );
}
