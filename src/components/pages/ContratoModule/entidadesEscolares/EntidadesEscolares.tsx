import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Column, Table } from '@/components/Table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { IconType, IconBaseProps } from 'react-icons';
import { PageEnumContratos } from '@/enums';
import { EntitiesEntidadesEscolares } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

const columns = [
  new Column('Nome Operacional', 'nome_operacional'),
  new Column('Cidade', 'cidade'),
  new Column('Ações', 'acoes'),
];

export default function EntidadesEscolares(): JSX.Element {
  const [data, setData] = useState([] as EntitiesEntidadesEscolares[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { setUsersUpdated, usersUpdated, idContrato, setPage } =
    useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');

      try {
        const backendApi = new BackendApiMock(`${token}`);
        const escolas = await backendApi.localizarEntidadesEscolares({
          uuid_ec: idContrato,
        });

        setData(escolas);
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
        <button>Entidades Escolares</button>
      </nav>
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
        <Table<EntitiesEntidadesEscolares>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          searchInputNoneNome={'none'}
        />
      </PageContentContainer>
    </div>
  );
}
