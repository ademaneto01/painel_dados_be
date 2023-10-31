import { BackendApiGet } from '@/backendApi';
import { EntitiesUrl } from '@/entities';
import { FailedToFetchError } from '@/errors';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/DigitalResources.module.css';
export default function DigitalResources() {
  const [data, setData] = useState([] as EntitiesUrl[]);
  const [loaded, setLoaded] = useState(false);
  const [naoContemDados, setNaoContemDados] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('userId');

      try {
        const backendApi = new BackendApiGet(`${token}`);
        const user = await backendApi.localizarUsuario(userId);

        const dadosEntidade = await backendApi.localizarUrlPainel({
          id_ee: user[0].id_ee,
        });

        if (dadosEntidade.length > 0 && dadosEntidade[0].url_dados !== '') {
          setData(dadosEntidade);
        } else {
          setNaoContemDados(true);
        }
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
  }, []);
  if (!naoContemDados) {
    return (
      <div className={styles.containerDigitaResources}>
        {data.map((entityUrl) => (
          <iframe
            key={entityUrl.id}
            width="100%"
            height="100%"
            src={entityUrl.url_dados}
          />
        ))}
      </div>
    );
  } else if (naoContemDados) {
    return (
      <div className={styles.containerNaoContemDados}>
        <span className={styles.spanText}>
          Ainda não existe dados cadastrado para sua Entidade Escolar....
        </span>
      </div>
    );
  }
}
