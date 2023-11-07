import {
  PageContentContainer,
  CreateButton,
  Loader,
  BackButton,
} from '@/components/shared';
import styles from '@/styles/Turmas.module.css';
import { useEffect, useState } from 'react';
import { PageEnumContratos } from '@/enums';
import Cookies from 'js-cookie';
import { EntitiesInfosContrato } from '@/entities';
import { BackendApiDelete, BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ScreensInfosContrato } from '@/components/screensHTML';
import { ModalDelete } from '../../../modal';

function useFetchInfosContrato() {
  const [data, setData] = useState<EntitiesInfosContrato[]>([]);
  const [idInfos, setIdInfos] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setUsersUpdated, usersUpdated, idContrato } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      try {
        const backendApi = new BackendApiGet(`${token}`);
        const infosContratoData = await backendApi.listarInfosContrato(
          idContrato,
        );
        setIdInfos(infosContratoData[0].id);
        setData(infosContratoData);
        setUsersUpdated(false);
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
    if (!loaded) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  return { data, loaded, error, msgError, idInfos, setUsersUpdated };
}

async function deleteInfoContrato(
  idInfos: string,
  setModaldelete: Function,
  setUsersUpdated: Function,
) {
  const token = Cookies.get('auth_token');
  const backendApi = new BackendApiDelete(token);

  try {
    await backendApi.deletarInfosContrato({ id: idInfos });
    setModaldelete(false);
    setUsersUpdated(true);
  } catch (error: any) {
    console.error(error.response.data.mensagem);
  }
}
function Navbar() {
  return (
    <nav className={styles.boxButtonsNav}>
      <button>Informações do Contrato</button>
    </nav>
  );
}

function InfosContratoScreen({ data, error, msgError }: any) {
  console.log(msgError);
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
            {msgError}
          </h2>
        </div>
      ) : (
        <ScreensInfosContrato data={data} />
      )}
    </div>
  );
}

export default function InfosContrato(): JSX.Element {
  const { data, idInfos, setUsersUpdated, loaded, error, msgError } =
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
                onClick={() => setPage(PageEnumContratos.editarInfosContrato)}
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

          <BackButton
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

        <InfosContratoScreen data={data} error={error} msgError={msgError} />
      </PageContentContainer>
    </div>
  );
}
