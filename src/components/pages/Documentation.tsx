import { EntitiesDocumentation } from '@/entities';
import styles from '@/styles/Page.module.css';
import { CreateButton, PageContentContainer } from '../shared';
import { FiEye } from 'react-icons/fi';
import { Column, Table } from '../Table';
import { useEffect, useState } from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import ResourceCreate from '../quill/componentQuill/ComponenteQuill';
import { useGlobalContext } from '@/context/store';
import ResourceView from '../quill/view/view';

const columns = [new Column('Recursos', 'nome'), new Column('Ações', 'acoes')];

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function Documentation(): JSX.Element {
  const [data, setData] = useState([] as EntitiesDocumentation[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const {
    showQuillEdit,
    setShowQuillEdit,
    showBtnReturn,
    setShowBtnReturn,
    setLesson,
    resourceView,
    setResourceView,
    setTitleQuill,
  } = useGlobalContext();
  const [showQuill, setShowQuill] = useState(false);

  function handleClickQuill(): void {
    setShowQuill(true);
    setShowBtnReturn(true);
  }
  function handleClickShowView(): void {
    setResourceView(true);
  }

  function handleClickBackTable(): void {
    setShowQuill(false);
    setShowQuillEdit(false);
    setResourceView(false);
    setShowBtnReturn(false);
    setTitleQuill('');
    setLesson('');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const carteiras = await backendApi.getDocumentation();
        setData(carteiras);
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
      <h4>Documentação</h4>
      <PageContentContainer>
        <div className={styles.boxToAlignBtns}>
          {showBtnReturn && (
            <CreateButton
              color={'var(--blue-300)'}
              colorBackGround={'var(--white)'}
              text="Voltar"
              onClick={() => handleClickBackTable()}
            />
          )}
          {showBtnReturn === false && (
            <CreateButton
              color={'var(--white'}
              colorBackGround={'var(--blue-300)'}
              text="Novo recurso"
              onClick={() => handleClickQuill()}
            />
          )}
          {showBtnReturn && (
            <CreateButton
              color={'var(--blue-300)'}
              colorBackGround={'var(--white)'}
              icon={reactIcon(FiEye)}
              onClick={() => handleClickShowView()}
            />
          )}
        </div>
        {resourceView ? (
          <ResourceView />
        ) : (
          <>
            {showQuill || showQuillEdit ? (
              <ResourceCreate />
            ) : (
              <Table<EntitiesDocumentation>
                data={data}
                columns={columns}
                loaded={loaded}
                error={error}
                labelInput={'Buscar recurso'}
                searchInputNone={'none'}
              />
            )}
          </>
        )}
      </PageContentContainer>
    </div>
  );
}
