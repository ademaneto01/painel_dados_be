import BackendApiMock from '@/backendApi';
import { EntitiesUrl } from '@/entities';
import { FailedToFetchError } from '@/errors';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/DigitalResources.module.css';
export default function DigitalResources() {
  const [data, setData] = useState([] as EntitiesUrl[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('userId');

      try {
        const backendApi = new BackendApiMock(`${token}`);

        const users = await backendApi.getUrl({ userId });
        setData(users);
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
}
