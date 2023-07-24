import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PageEnumSchool } from '@/enums';
import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { EntitiesTurmas } from '@/entities';
import { Column, Table } from '@/components/Table';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';

interface pageSchoolProps {
  setPage: Dispatch<SetStateAction<PageEnumSchool>>;
  setLabel: Dispatch<SetStateAction<string>>;
  label: String;
}

const columns = [
  new Column('Turma', 'turma'),
  new Column('Ano', 'ano'),
  new Column('Professor', 'professor'),
  new Column('Código', 'codigo'),
  new Column('Materiais de Language', 'languageMaterials'),
];

export default function Turmas(props: pageSchoolProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesTurmas[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleRowClick = () => {
    console.log('Row clicked:', props);
    props.setPage(PageEnumSchool.alunos);
  };
  const handleRowClickProf = () => {
    console.log('Row clicked:', props);
    props.setPage(PageEnumSchool.professores);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const turmas = await backendApi.getTurmas();
        setData(turmas);
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
        <button id={styles.classSelected}>Turmas</button>
        <button onClick={handleRowClick}>Alunos</button>
        <button onClick={handleRowClickProf}>Professores</button>
      </nav>
      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Nova Turma"
            onClick={() => {}}
          />
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => props.setPage(PageEnumSchool.schools)}
          />
        </div>
        <Table<EntitiesTurmas>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          searchInputNoneNome={'none'}
          labelInput={'Buscar pela Turma'}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </>
  );
}
