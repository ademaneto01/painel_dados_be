import { useGlobalContext } from '@/context/store';
import pages from '../../pages/acompanhamentoPDG/index';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

export default function SwitchCaseContratos() {
  const { pageAcompanhamento } = useGlobalContext();

  function PagesAcompanhamento(): JSX.Element {
    switch (pageAcompanhamento) {
      case PageEnumAcompanhamentoPDG.registrarAcompanhamento:
        return <pages.RegistrarAcompanhamento />;
      case PageEnumAcompanhamentoPDG.acompanhamentos:
        return <pages.Acompanhamentos />;
      case PageEnumAcompanhamentoPDG.visualizeAcompanhamento:
        return <pages.VisualizeAcompanhamento />;
      case PageEnumAcompanhamentoPDG.editarAcompanhamento:
        return <pages.EditarAcompanhamento />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesAcompanhamento />}</div>;
}
