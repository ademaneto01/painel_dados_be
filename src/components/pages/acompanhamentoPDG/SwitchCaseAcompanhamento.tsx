import { useGlobalContext } from '@/context/store';
import pages from '../../pages/acompanhamentoPDG/index';
import { pageEnumAcompanhamentoPDG } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

export default function SwitchCaseContratos() {
  const { pageAcompanhamento } = useGlobalContext();

  function PagesAcompanhamento(): JSX.Element {
    switch (pageAcompanhamento) {
      case pageEnumAcompanhamentoPDG.registrarAcompanhamento:
        return <pages.RegistrarAcompanhamento />;

      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesAcompanhamento />}</div>;
}
