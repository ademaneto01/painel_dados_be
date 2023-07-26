import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PageEnumSchool } from '@/enums';
import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { EntitiesProfessores } from '@/entities';
import { IconBaseProps, IconType } from 'react-icons';
import { Column, Table } from '@/components/Table';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { BiCloudDownload } from 'react-icons/bi';

interface pageSchoolProps {
  setPage: Dispatch<SetStateAction<PageEnumSchool>>;
  setLabel?: Dispatch<SetStateAction<string>>;
  label: string;
}
const columns = [
  new Column('Professor', 'professor'),
  new Column('Turma', 'turma'),
];
function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
export default function Professores(props: pageSchoolProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesProfessores[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleRowClick = () => {
    console.log('Row clicked:', props);
    props.setPage(PageEnumSchool.turmas);
  };
  const handleRowClickAluno = () => {
    console.log('Row clicked:', props);
    props.setPage(PageEnumSchool.alunos);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const professores = await backendApi.getProfessores();
        setData(professores);
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
        <button onClick={handleRowClickAluno}>Alunos</button>
        <button id={styles.classSelected}>Professores</button>
      </nav>

      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            icon={reactIcon(BiCloudDownload)}
            text="Importar"
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

        <Table<EntitiesProfessores>
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
