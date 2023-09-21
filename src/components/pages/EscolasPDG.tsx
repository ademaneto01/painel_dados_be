import { PageContentContainer, CreateButton } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Column, Table } from '@/components/Table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { IconType, IconBaseProps } from 'react-icons';
import { BiCloudDownload, BiCloudUpload } from 'react-icons/bi';
import { PageEnum } from '@/enums';
import { EntitiesEntidadesEscolaresPDG } from '@/entities';
import BackendApiMock from '@/backendApi';

interface pageContratosProps {
  setPage: Dispatch<SetStateAction<PageEnum>>;
}

const columns = [
  new Column('Nome Operacional', 'nome_operacional'),
  new Column('Cidade', 'cidade'),
  new Column('Ações', 'acoes'),
];

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function EscolasPDG(props: pageContratosProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesEntidadesEscolaresPDG[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      const idUsuario = localStorage.getItem('userId');

      try {
        const backendApi = new BackendApiMock(`${token}`);
        const escolas = await backendApi.localizarEntidadesEscolaresUsuariosPDG(
          {
            userId: idUsuario,
          },
        );

        setData(escolas);
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
      <h4>Pegagógico</h4>
      <nav className={styles.boxButtonsNav}>
        <button>Entidades Escolares</button>
      </nav>
      <PageContentContainer>
        <Table<EntitiesEntidadesEscolaresPDG>
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
