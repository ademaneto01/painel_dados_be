import { useGlobalContext } from '@/context/store';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import styles from '@/styles/CardLessons.module.css';
import dynamic from 'next/dynamic';

const RegistrarAcompanhamento = dynamic(
  () =>
    import(
      '../acompanhamentoPDG/CRUDAcompanhamento/registrarAcompanhamento/RegistrarAcompanhamento'
    ),
);

const Acompanhamentos = dynamic(
  () => import('../acompanhamentoPDG/acompanhamentos/Acompanhamentos'),
);
const VisualizeAcompanhamento = dynamic(
  () =>
    import(
      '../acompanhamentoPDG/visualizeAcompanhamento/VisualizeAcompanhamento'
    ),
);
const EditarAcompanhamento = dynamic(
  () =>
    import(
      '../acompanhamentoPDG/CRUDAcompanhamento/editarAcompanhamento/EditarAcompanhamento'
    ),
);
export default function SwitchCaseContratos() {
  const { pageAcompanhamento } = useGlobalContext();

  function PagesAcompanhamento(): JSX.Element {
    switch (pageAcompanhamento) {
      case PageEnumAcompanhamentoPDG.registrarAcompanhamento:
        return <RegistrarAcompanhamento />;
      case PageEnumAcompanhamentoPDG.acompanhamentos:
        return <Acompanhamentos />;
      case PageEnumAcompanhamentoPDG.visualizeAcompanhamento:
        return <VisualizeAcompanhamento />;
      case PageEnumAcompanhamentoPDG.editarAcompanhamento:
        return <EditarAcompanhamento />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesAcompanhamento />}</div>;
}
