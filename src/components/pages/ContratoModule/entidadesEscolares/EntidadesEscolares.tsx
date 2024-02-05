import {
  PageContentContainer,
  CreateButton,
  BackButton,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Table } from '@/components/Table';
import { useEffect, useState, useMemo } from 'react';
import { PageEnumContratos } from '@/enums';
import { EntitiesEntidadesEscolares } from '@/entities';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ModalSucesso } from '../../../modal';

class Column<T> {
  constructor(public header: string, public accessor: keyof T) {}
}

type RowData = {
  nome_operacional: any;
  cidade: any;
  acoes: any;
  active: any;
};

const columns: Column<RowData>[] = [
  new Column<RowData>('Nome Operacional', 'nome_operacional'),
  new Column<RowData>('Cidade', 'cidade'),
  new Column<RowData>('Ações', 'acoes'),
  new Column<RowData>('Ativo', 'active'),
];

function useFetchEntidadesEscolares() {
  const [data, setData] = useState<EntitiesEntidadesEscolares[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const {
    setContractOrEntidadeUpdated,
    contractOrEntidadeUpdated,
    idContrato,
  } = useGlobalContext();

  // useEffect(() => {
  //   async function fetchData() {
  //     const token = localStorage.getItem('auth_token');
  //     try {
  //       const backendApi = new BackendApiGet(`${token}`);
  //       const entidadesEscola = await backendApi.localizarEntidadesEscolares(
  //         idContrato,
  //       );
  //       setData(entidadesEscola);
  //       setContractOrEntidadeUpdated(false);
  //     } catch (error: any) {
  //       setContractOrEntidadeUpdated(false);
  //       setError(true);
  //       if (error.response.data.mensagem) {
  //         setMsgError(error.response.data.mensagem);
  //       } else {
  //         setMsgError('Ocorreu um erro desconhecido.');
  //       }
  //     } finally {
  //       setLoaded(true);
  //     }
  //   }
  //   if (!loaded) {
  //     fetchData();
  //   }
  // }, [loaded, contractOrEntidadeUpdated]);

  const processEscolas = (escolas: EntitiesEntidadesEscolares[]) => {
    return escolas.map((escolas) => new EntitiesEntidadesEscolares(escolas));
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return;
      }
      try {
        const backendApi = new BackendApiGet(token);
        const escolas = await backendApi.localizarEntidadesEscolares(
          idContrato,
        );
        const escolasData = escolas.map(
          (e) => new EntitiesEntidadesEscolares(e),
        );

        setData(escolasData);
        setContractOrEntidadeUpdated(false);
      } catch (error: any) {
        setContractOrEntidadeUpdated(false);
        setError(true);
        setMsgError(
          error.response?.data?.mensagem || 'Ocorreu um erro desconhecido.',
        );
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded || contractOrEntidadeUpdated) {
      fetchData();
    }
  }, [data]);

  const escolasProcessadas = useMemo(() => processEscolas(data), [data]);

  return { data: escolasProcessadas, loaded, error, msgError };
}

function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Entidades Escolares</button>
    </nav>
  );
}

function EntidadesEscolaresTable({ data, loaded, error, msgError }: any) {
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
    />
  );
}

export default function EntidadesEscolares(): JSX.Element {
  const { data, loaded, error } = useFetchEntidadesEscolares();
  const { setPage, usersUpdated } = useGlobalContext();

  return (
    <div className={styles.pageContainer}>
      <h4>Contratos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Nova Escola"
            onClick={() => setPage(PageEnumContratos.novaEntidade)}
          />
          <BackButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>
        {usersUpdated && (
          <ModalSucesso
            message={'Status da Entidade Escolar alterado com sucesso...'}
          />
        )}
        <EntidadesEscolaresTable data={data} loaded={loaded} error={error} />
      </PageContentContainer>
    </div>
  );
}
