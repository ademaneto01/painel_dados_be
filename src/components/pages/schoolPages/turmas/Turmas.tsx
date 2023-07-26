import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PageEnumSchool } from '@/enums';
import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { IconBaseProps, IconType } from 'react-icons';
import { EntitiesTurmas } from '@/entities';
import { Column, Table } from '@/components/Table';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { ModalAddEscola } from '@/components/modal';
import { BiCloudDownload, BiCloudUpload } from 'react-icons/bi';

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

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function Turmas(props: pageSchoolProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesTurmas[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalAddEscola, setShowModalAddEscola] = useState(false);

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
            icon={reactIcon(BiCloudDownload)}
            text="Importar"
            onClick={() => {}}
          />
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            icon={reactIcon(BiCloudUpload)}
            text="Exportar"
            onClick={() => {}}
          />
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            text="Nova Turma"
            onClick={() => setShowModalAddEscola(true)}
          />
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => props.setPage(PageEnumSchool.schools)}
          />
        </div>
        {showModalAddEscola && (
          <ModalAddEscola onCancel={() => setShowModalAddEscola(false)} />
        )}
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
