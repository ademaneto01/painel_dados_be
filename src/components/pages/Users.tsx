import styles from '@/styles/Page.module.css';
import { CreateButton, PageContentContainer } from '../shared';
import { Column, Table } from '../Table';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { ModalAddUser } from '../modal';
import EntitiesUsers from '@/entities/EntitiesUsers';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
const columns = [
  new Column('Nome', 'nome'),
  new Column('E-mail', 'email'),
  new Column('Perfil', 'perfil'),
  new Column('Ações', 'acoes'),
];

function PageUsers() {
  const [data, setData] = useState([] as EntitiesUsers[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const { usersUpdated, setUsersUpdated } = useGlobalContext();
  function handleClickOpenModalAdd(): void {
    setShowModalUser(true);
  }
  function handleClickCloseModalAdd(): void {
    setShowModalUser(false);
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);

        const users = await backendApi.getUsers();

        setData(users);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
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
      <h4>Usuarios</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--blue-300)'}
          text="Nova usuário"
          onClick={() => handleClickOpenModalAdd()}
        />
        {showModalUser && (
          <ModalAddUser
            userId={''}
            onCancel={() => handleClickCloseModalAdd()}
          />
        )}
        <Table<EntitiesUsers>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          labelInput={'Buscar pelo nome ou email'}
        />
      </PageContentContainer>
    </div>
  );
}

export default PageUsers;
