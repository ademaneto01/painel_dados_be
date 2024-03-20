import { BackendApiGet } from '@/backendApi';
import { EntitiesUrl } from '@/entities';
import { useEffect, useState } from 'react';
import styles from '@/styles/DigitalResources.module.css';
import { ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils/HandleApiErrors';
import iframeUrl from '@/utils/metaBase';

export default function DigitalResources() {
  const [data, setData] = useState([] as EntitiesUrl[]);
  const [loaded, setLoaded] = useState(false);
  const [naoContemDados, setNaoContemDados] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('userId');

      try {
        const backendApi = new BackendApiGet(`${token}`);
        const user = await backendApi.localizarUsuario(userId);
        let dadosEntidade: any[] = [];

        if (user[0].perfil === 'Escola') {
          dadosEntidade = await backendApi.localizarUrlPainel(user[0].id_ee);
        } else {
          setNaoContemDados(true);
          return;
        }

        if (dadosEntidade.length > 0 && dadosEntidade[0].url_dados !== '') {
          setData(dadosEntidade);
        } else {
          setNaoContemDados(true);
        }
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);
  if (!naoContemDados) {
    return (
      <div className={styles.containerDigitaResources}>
        {/* {data.map((entityUrl) => (
          <iframe
            key={entityUrl.id}
            width="100%"
            height="100%"
            src={entityUrl.url_dados}
          />
        ))} */}
        <iframe width="100%" height="100%" src={iframeUrl} />
        {error && <ErrorComponent message={msgError} />}
      </div>
    );
  } else if (naoContemDados) {
    return (
      <div className={styles.containerNaoContemDados}>
        <span className={styles.spanText}>
          Ainda não existem dados cadastrados para sua Entidade Escolar....
        </span>
        {error && <ErrorComponent message={msgError} />}
      </div>
    );
  }
}
