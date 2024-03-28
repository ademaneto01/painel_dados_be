import { BackendApiGet } from '@/backendApi';
import { useEffect, useState } from 'react';
import styles from '@/styles/DigitalResources.module.css';
import { ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils/HandleApiErrors';

export default function DigitalResources() {
  const [iframe, setIframe] = useState('');
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
          dadosEntidade = await backendApi.localizarEntidadeEscolar(
            user[0].id_ee,
          );
          const nomeEscola = dadosEntidade[0].nome_operacional;

          switch (nomeEscola) {
            case 'Centro Educacional Da Lagoa - Unidade Barra':
              setIframe(
                'https://dados.be.education/public/dashboard/7ee9fc27-1752-4cad-a673-01322b99b999',
              );
              break;
            case 'Centro Educacional Da Lagoa - Unidade Lopes Quintas':
              setIframe(
                'https://dados.be.education/public/dashboard/5138a9b9-fc3d-40ed-b331-6ffe5b855879',
              );
              break;
            case 'Centro Educacional Da Lagoa - Unidade Norte Shopping':
              setIframe(
                'https://dados.be.education/public/dashboard/59398558-3a1b-462d-9359-967bd05d7df6',
              );
              break;
            case 'Colegio Batista Mineiro - Unidade Floresta SF':
              setIframe(
                'https://dados.be.education/public/dashboard/51ea5c8b-de42-4638-b575-cb07d434530b',
              );
              break;
            case 'Colegio Batista Mineiro - Unidade Floresta SI':
              setIframe(
                'https://dados.be.education/public/dashboard/876bf592-92d9-4832-8a31-80d4b6966f05',
              );
              break;
            case 'Interamérica - Unidade 1':
              setIframe(
                'https://dados.be.education/public/dashboard/90f1b181-98a4-4fee-ac27-da943bf75d72',
              );
              break;
            case 'Interamérica - Unidade 2':
              setIframe(
                'https://dados.be.education/public/dashboard/85bd149a-001b-4d3f-a30d-e4d4ed68ed47',
              );
              break;
            case 'Liessin - Unidade Barra da Tijuca':
              setIframe(
                'https://dados.be.education/public/dashboard/4752d95b-6802-4259-8868-2e439ebcf067',
              );
              break;
            case 'Liessin - Unidade Botafogo':
              setIframe(
                'https://dados.be.education/public/dashboard/7a3163dd-f964-4109-89c9-5a46f814c085',
              );
              break;
            case 'Liessin - Unidade Leblon':
              setIframe(
                'https://dados.be.education/public/dashboard/c02797af-41a9-4194-84fb-c9ff12cbd8f1',
              );
              break;

            default:
              const iframe = await backendApi.metaBaseIframe(nomeEscola);
              setIframe(iframe[0].iframeUrl);
          }
        } else {
          setNaoContemDados(true);
          return;
        }

        // if (!iframe) {
        //   setNaoContemDados(true);
        // }
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
        <iframe width="100%" height="100%" src={iframe} />
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
