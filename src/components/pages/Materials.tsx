import { EntitiesMaterials } from '@/entities';
import styles from '@/styles/Page.module.css';
import { CreateButton, PageContentContainer } from '../shared';
import { Column, Table } from '../Table';
import { useEffect, useState } from 'react';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { ModalMaterials } from '../modal';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Grade', 'grade'),
  new Column('Discipline', 'disciplina'),
  new Column('Conteúdos digitais', 'conteudoDigital'),
  new Column('Ações', 'acoes'),
];

export default function Materials() {
  const [data, setData] = useState([] as EntitiesMaterials[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);

  function handleClickOpenModalAdd(): void {
    setShowModalUser(true);
  }
  function handleClickCloseModalAdd(): void {
    setShowModalUser(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await backendApi.getMaterials();
        setData(users);
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
  }, [loaded]);

  return (
    <div className={styles.pageContainer}>
      <h4>Materials</h4>
      <PageContentContainer>
        <CreateButton
          color={'var(--white'}
          colorBackGround={'var(--blue-300)'}
          text="Novo Material"
          onClick={() => handleClickOpenModalAdd()}
        />
        {showModalUser && (
          <ModalMaterials onCancel={() => handleClickCloseModalAdd()} />
        )}
        <Table<EntitiesMaterials>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          labelInput={'Buscar pelo nome'}
          searchInputNone={'none'}
        />
      </PageContentContainer>
    </div>
  );
}
