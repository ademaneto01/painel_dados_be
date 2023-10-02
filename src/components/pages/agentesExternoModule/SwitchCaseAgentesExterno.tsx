import { useGlobalContext } from '@/context/store';
import pages from '../agentesExternoModule/index';
import { PageEnumAgentesExterno } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

export default function SwitchCaseAgentesExterno() {
  const { pageAgentesExterno } = useGlobalContext();

  function PagesAgentesExterno(): JSX.Element {
    switch (pageAgentesExterno) {
      case PageEnumAgentesExterno.agentes:
        return <pages.Agentes />;
      case PageEnumAgentesExterno.registrarAgente:
        return <pages.RegistrarAgente />;
      case PageEnumAgentesExterno.editarAgente:
        return <pages.EditarAgente />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesAgentesExterno />}</div>;
}
