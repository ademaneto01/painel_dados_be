import { useGlobalContext } from '@/context/store';
// import pages from '../agentesExternoModule/index';
import dynamic from 'next/dynamic';
import { PageEnumAgentesExterno } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

const Agentes = dynamic(
  () => import('../agentesExternoModule/agentes/agentes'),
);
const RegistrarAgente = dynamic(
  () => import('../agentesExternoModule/CRUDAgente/RegistrarAgente'),
);
const EditarAgente = dynamic(
  () => import('../agentesExternoModule/CRUDAgente/EditarAgente'),
);
export default function SwitchCaseAgentesExterno() {
  const { pageAgentesExterno } = useGlobalContext();

  function PagesAgentesExterno(): JSX.Element {
    switch (pageAgentesExterno) {
      case PageEnumAgentesExterno.agentes:
        return <Agentes />;
      case PageEnumAgentesExterno.registrarAgente:
        return <RegistrarAgente />;
      case PageEnumAgentesExterno.editarAgente:
        return <EditarAgente />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesAgentesExterno />}</div>;
}
