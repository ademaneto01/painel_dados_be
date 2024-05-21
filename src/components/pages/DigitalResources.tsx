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
            case 'Rede Batista de Educação GERAL':
              setIframe(
                'https://dados.be.education/public/dashboard/df703a86-843c-4c06-a811-a5661096127e',
              );
              break;
            case 'COC Santa Catarina GERAL':
              setIframe(
                'https://dados.be.education/public/dashboard/f0978c17-a567-4586-a7ee-26758e7b31a9',
              );
              break;
            case 'Liessin GERAL':
              setIframe(
                'https://dados.be.education/public/dashboard/039f0824-36ae-428f-89b4-a5af3ad48691',
              );
              break;
            case 'Notre Dame - GERAL':
              setIframe(
                'https://dados.be.education/public/dashboard/c5301435-e59c-49f5-b7fd-5d382c2a5599',
              );
              break;
            case 'Razão GERAL':
              setIframe(
                'https://dados.be.education/public/dashboard/62a369f7-77fe-4880-8280-fc8705d08adc',
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
