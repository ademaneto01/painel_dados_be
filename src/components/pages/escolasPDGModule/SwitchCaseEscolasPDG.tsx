import { useGlobalContext } from '@/context/store';
import pages from '../escolasPDGModule/index';
import { PageEnumEscolasPDG } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

export default function SwitchCaseEscolasPDG() {
  const { pageEscolasPDG } = useGlobalContext();

  function PagesEscolasPDG(): JSX.Element {
    switch (pageEscolasPDG) {
      case PageEnumEscolasPDG.escolasPDG:
        return <pages.EscolasPDG />;
      case PageEnumEscolasPDG.registrarDocEntidadePDG:
        return <pages.RegistrarDocEntidadePDG />;
      case PageEnumEscolasPDG.docsEscola:
        return <pages.DocsEscola />;
      case PageEnumEscolasPDG.professoresEscola:
        return <pages.ProfessoresEscola />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesEscolasPDG />}</div>;
}
