import {
  PageContentContainer,
  CreateButton,
  Loader,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { useEffect, useState } from 'react';
import { FailedToFetchError } from '@/errors';
import { PageEnumContratos } from '@/enums';
import Cookies from 'js-cookie';
import { EntitiesInfosContrato } from '@/entities';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ScreensInfosContrato } from '@/components/screensHTML';
import { ModalDelete } from '../../../modal';

function useFetchInfosContrato() {
  const [data, setData] = useState<EntitiesInfosContrato[]>([]);
  const [idInfos, setIdInfos] = useState('');

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { setUsersUpdated, usersUpdated, idContrato } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiMock(`${token}`);
        const infosContratoData = await backendApi.listarInfosContrato({
          uuid_ec: idContrato,
        });
        setIdInfos(infosContratoData[0].id);
        setData(infosContratoData);
        setUsersUpdated(false);
      } catch (error) {
        setError(true);

        // if (error instanceof FailedToFetchError) {
        //   setError(true);
        // } else {
        //   throw error;
        // }
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  return { data, loaded, error, idInfos, setUsersUpdated };
}

async function deleteInfoContrato(
  idInfos: string,
  setModaldelete: Function,
  setUsersUpdated: Function,
) {
  const token = Cookies.get('auth_token');
  const backendApi = new BackendApiMock(token);

  try {
    await backendApi.deletarInfosContrato({ id: idInfos });
    setModaldelete(false);
    setUsersUpdated(true);
  } catch (error) {
    console.log(error);
  }
}
function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Informações do Contrato</button>
    </nav>
  );
}

function InfosContratoScreen({ data, loaded, error }: any) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
        marginTop: '1rem',
      }}
    >
      {error ? (
        <div className={styles.pageContainer}>
          <h2
            style={{
              color: 'red',
              marginTop: '3rem',
            }}
          >
            Ainda não existe Informações sobre o contrato...
          </h2>
        </div>
      ) : (
        <ScreensInfosContrato data={data} />
      )}
    </div>
  );
}

export default function InfosContrato(): JSX.Element {
  const { data, idInfos, setUsersUpdated, loaded, error } =
    useFetchInfosContrato();
  const [modalDelete, setModaldelete] = useState(false);
  const { setPage } = useGlobalContext();

  if (!loaded) {
    return <Loader />;
  }
  return (
    <div className={styles.pageContainer}>
      <h4>Documentos</h4>
      <Navbar />
      <PageContentContainer>
        <div className={styles.boxBtns}>
          {!error ? (
            <>
              <CreateButton
                color={'var(--white'}
                size={'10rem'}
                colorBackGround={'red'}
                text="Deletar Infos."
                onClick={() => setModaldelete(true)}
              />

              <CreateButton
                color={'var(--white'}
                size={'10rem'}
                colorBackGround={'var(--blue-300)'}
                text="Editar Informações"
                onClick={() => setPage(PageEnumContratos.registrarDocEntidade)}
              />
            </>
          ) : (
            <CreateButton
              color={'var(--white'}
              size={'10rem'}
              colorBackGround={'var(--blue-300)'}
              text="Cadastrar Infos."
              onClick={() => setPage(PageEnumContratos.registrarInfosContrato)}
            />
          )}

          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>
        {modalDelete && (
          <ModalDelete
            title={'Excluir'}
            message={`Realmente deseja Deletar Informações?`}
            onConfirm={() =>
              deleteInfoContrato(idInfos, setModaldelete, setUsersUpdated)
            }
            onCancel={() => setModaldelete(false)}
          />
        )}

        <InfosContratoScreen data={data} error={error} />
      </PageContentContainer>
    </div>
  );
}
