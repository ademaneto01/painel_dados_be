import {
  CreateButton,
  PageContentContainer,
  BackButton,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { Column, Table } from '@/components/Table';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { EntitiesVinculosAgentesExterno } from '@/entities';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumEscolasPDG } from '@/enums';
import ModalVicularAgente from '@/components/modal/modalVincularAgente/ModalVincularAgente';

const COLUMNS = [
  new Column('Nome', 'nome'),
  new Column('E-mail Primario', 'no_email_primario'),
  new Column('Telefone', 'nu_telefone'),
  new Column('Cargo', 'cargo'),
  new Column('Ações', 'acoes'),
];

export default function EscolasPDG(): JSX.Element {
  const [data, setData] = useState<EntitiesVinculosAgentesExterno[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const {
    idEntidadeEscolar,
    setPageEscolasPDG,
    usersUpdated,
    setUsersUpdated,
  } = useGlobalContext();
  const [showModalVincularAgente, setShowModalVincularAgente] = useState(false);

  useEffect(() => {
    if (!loaded) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  function handleOpenModalVincularAgente(): void {
    setShowModalVincularAgente(true);
  }
  function handleClickCloseModalAdd(): void {
    setShowModalVincularAgente(false);
  }

  async function fetchData() {
    const token = localStorage.getItem('auth_token');

    try {
      const backendApi = new BackendApiGet(`${token}`);
      const agentesExternosData =
        await backendApi.listarAgenteRelacionadoEscola({
          id_ee: idEntidadeEscolar,
        });
      setData(agentesExternosData);
      setUsersUpdated(false);
    } catch (err) {
      if (err instanceof FailedToFetchError) {
        setError(true);
      } else {
        throw err;
      }
    } finally {
      setLoaded(true);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons
          setPageEscolasPDG={setPageEscolasPDG}
          onOpenModal={handleOpenModalVincularAgente}
        />
        {showModalVincularAgente && (
          <ModalVicularAgente onCancel={() => handleClickCloseModalAdd()} />
        )}
        <Table<EntitiesVinculosAgentesExterno>
          data={data}
          columns={COLUMNS}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          searchInputNoneEscola={'none'}
          labelInput={'Buscar pelo nome'}
        />
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Agentes Externos</h4>;

const NavigationButtons: React.FC<any> = ({
  setPageEscolasPDG,
  onOpenModal,
}) => (
  <div className={styles.boxBtns}>
    <CreateButton
      color={'var(--white'}
      colorBackGround={'var(--blue-300)'}
      text="Vincular Agente"
      onClick={onOpenModal}
    />
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPageEscolasPDG(PageEnumEscolasPDG.escolasPDG)}
    />
  </div>
);
