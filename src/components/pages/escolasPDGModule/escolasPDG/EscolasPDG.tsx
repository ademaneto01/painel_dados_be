import { PageContentContainer } from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Column, Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { EntitiesEntidadesEscolaresPDG } from '@/entities';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumEscolasPDG } from '@/enums';

const COLUMNS = [
  new Column('Nome Operacional', 'nome_operacional'),
  new Column('Cidade', 'cidade'),
  new Column('Ações', 'acoes'),
];

export default function EscolasPDG(): JSX.Element {
  const [data, setData] = useState<EntitiesEntidadesEscolaresPDG[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPageEscolasPDG, setIdEntidadeEscolar } = useGlobalContext();

  const handleRowClick = (rowData: EntitiesEntidadesEscolaresPDG) => {
    setPageEscolasPDG(PageEnumEscolasPDG.professoresEscola);
    setIdEntidadeEscolar(rowData.id);
  };

  useEffect(() => {
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);

  async function fetchData() {
    const token = localStorage.getItem('auth_token');
    const idUsuario = localStorage.getItem('userId');

    try {
      const backendApi = new BackendApiGet(`${token}`);
      const contentidadesEscolasratos =
        await backendApi.localizarEntidadesEscolaresUsuariosPDG(idUsuario);

      setData(contentidadesEscolasratos);
    } catch (error: any) {
      setError(true);
      if (error.response.data.mensagem) {
        setMsgError(error.response.data.mensagem);
      } else {
        setMsgError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoaded(true);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <h4>Pedagógico</h4>
      <nav className={styles.boxButtonsNav}>
        <button>Entidades Escolares</button>
      </nav>
      <PageContentContainer>
        <Table<EntitiesEntidadesEscolaresPDG>
          data={data}
          columns={COLUMNS}
          loaded={loaded}
          error={error}
          msgError={msgError}
          searchInputNone={'none'}
          searchInputNoneEscola={'none'}
          labelInput={'Buscar pela escola'}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </div>
  );
}
