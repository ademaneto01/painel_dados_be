import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PageEnumSchool } from '@/enums';
import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { EntitiesAlunos, EntitiesTurmas } from '@/entities';
import { Column, Table } from '@/components/Table';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';

interface pageSchoolProps {
  setPage: Dispatch<SetStateAction<PageEnumSchool>>;
  setLabel?: Dispatch<SetStateAction<string>>;
  label: string;
}
const columns = [
  new Column('Aluno', 'aluno'),
  new Column('Responsável', 'responsavel'),
  new Column('Turma', 'turma'),
];
export default function Alunos(props: pageSchoolProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesAlunos[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleRowClick = () => {
    props.setPage(PageEnumSchool.turmas);
  };
  const handleRowClickProf = () => {
    props.setPage(PageEnumSchool.professores);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const alunos = await backendApi.getAlunos();
        setData(alunos);
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
    <>
      <h4>{props.label}</h4>
      <nav className={styles.boxButtonsNav}>
        <button onClick={handleRowClick}>Turmas</button>
        <button id={styles.classSelected}>Alunos</button>
        <button onClick={handleRowClickProf}>Professores</button>
      </nav>
      <PageContentContainer>
        <CreateButton
          color={'var(--gray-300'}
          colorBackGround={'var(--white)'}
          text="Voltar"
          size="8rem"
          onClick={() => props.setPage(PageEnumSchool.schools)}
        />
        <Table<EntitiesAlunos>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          searchInputNoneNome={'none'}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </>
  );
}
