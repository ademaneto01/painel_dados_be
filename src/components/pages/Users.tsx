import styles from '@/styles/Page.module.css';
import React from 'react';
import { CreateButton, PageContentContainer } from '../shared';
import { Column, Table } from '../Table';
import { useEffect, useState } from 'react';
import { ModalAddUser } from '../modal';
import EntitiesUsers from '@/entities/EntitiesUsers';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ModalSucesso } from '../modal';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils/HandleApiErrors';

const columns = [
  new Column('Nome', 'nome'),
  new Column('E-mail', 'email'),
  new Column('Perfil', 'perfil'),
  new Column('Escola', 'escola'),
  new Column('Ações', 'acoes'),
  new Column('Ativo', 'toogleUser'),
];

function PageUsers() {
  const [data, setData] = useState([] as EntitiesUsers[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [showModalUser, setShowModalUser] = useState(false);
  const { switchUsuarios, loadedUser } = useGlobalContext();

  function handleClickOpenModalAdd(): void {
    setShowModalUser(true);
  }
  function handleClickCloseModalAdd(): void {
    setShowModalUser(false);
  }

  function UsersTable({ data, loaded, error, columns, msgError }: any) {
    return (
      <Table
        data={data}
        columns={columns}
        loaded={loaded}
        error={error}
        msgError={msgError}
        labelInput={'Buscar pelo Nome'}
      />
    );
  }
  const handleUserAdded = () => {
    setLoaded(false);
  };
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);

        const users = await backendApi.localizarUsuarios();
        const usersersOrderBy = users.sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          }
          if (a.nome > b.nome) {
            return 1;
          }
          return 0;
        });

        setData(usersersOrderBy);
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded || switchUsuarios || loadedUser) {
      fetchData();
    }
  }, [loaded, switchUsuarios, loadedUser]);

  return (
    <div className={styles.pageContainer}>
      <h4>Usuários</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--verde-tech)'}
          text="Novo usuário"
          onClick={() => handleClickOpenModalAdd()}
        />
        {showModalUser && (
          <ModalAddUser
            titleModal={'Novo usuário'}
            onCancel={() => handleClickCloseModalAdd()}
            onUserAdded={handleUserAdded}
          />
        )}
        {switchUsuarios && (
          <ModalSucesso message={'Status do usuário alterado com sucesso...'} />
        )}
        <UsersTable
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          msgError={msgError}
          labelInput={'Buscar pelo nome ou email'}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

export default PageUsers;
