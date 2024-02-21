import {
  PageContentContainer,
  CreateButton,
  Loader,
  BackButton,
  DeleteButton,
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
  const { idContrato } = useGlobalContext();

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
  }, [loaded]);

  return { data, loaded, error, msgError, idInfos, setLoaded };
}

async function deleteInfoContrato(
  idInfos: string,
  setModaldelete: Function,
  setLoaded: Function,
) {
  const token = Cookies.get('auth_token');
  const backendApi = new BackendApiDelete(token);

  try {
    await backendApi.deletarInfosContrato({ id: idInfos });
    setModaldelete(false);
    setLoaded(false);
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
  return (
    <div className={styles.boxInfosXContrato}>
      {error ? (
        <div className={styles.pageContainer}>
          <h2 className={styles.msgInfosContratoNotFound}>{msgError}</h2>
        </div>
      ) : (
        <ScreensInfosContrato data={data} />
      )}
    </div>
  );
}

export default function InfosContrato(): JSX.Element {
  const { data, idInfos, setLoaded, loaded, error, msgError } =
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
              <DeleteButton
                color={'var(--white)'}
                size={'10rem'}
                colorBackGround={'var(--red-300)'}
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
              deleteInfoContrato(idInfos, setModaldelete, setLoaded)
            }
            onCancel={() => setModaldelete(false)}
          />
        )}

        <InfosContratoScreen data={data} error={error} msgError={msgError} />
      </PageContentContainer>
    </div>
  );
}
