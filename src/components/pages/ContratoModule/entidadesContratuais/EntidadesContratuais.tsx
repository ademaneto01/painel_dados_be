import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Column, Table } from '@/components/Table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { PageEnumContratos } from '@/enums';
import { EntitiesContratos } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

const columns = [
  new Column('Nome Simplificado', 'nome_simplificado'),
  new Column('CNPJ', 'cnpj_cont'),
  new Column('QTD. Escolas', 'qtdescolas'),
  new Column('Ações', 'acoes'),
];

export default function EntidadesContratuais(): JSX.Element {
  const [data, setData] = useState([] as EntitiesContratos[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { setUsersUpdated, usersUpdated, setIdContrato, setPage } =
    useGlobalContext();

  const handleRowClick = (rowData: EntitiesContratos) => {
    setPage(PageEnumContratos.entidadesEscolares);
    setIdContrato(rowData.id);
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);

        const contratos = await backendApi.localizarContratos();
        setData(contratos);
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

  return (
    <div className={styles.pageContainer}>
      <h4>Contratos</h4>
      <nav className={styles.boxButtonsNav}>
        <button>Entidades Contratuais</button>
      </nav>
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Novo Contrato"
            onClick={() => setPage(PageEnumContratos.novoContrato)}
          />
        </div>
        <Table<EntitiesContratos>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          searchInputNoneNome={'none'}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </div>
  );
}
