import { useGlobalContext } from '@/context/store';
import pages from '../../pages/ContratoModule/index';
import { PageEnumContratos } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

export default function SwitchCaseContratos() {
  const { page } = useGlobalContext();

  function PagesContratos(): JSX.Element {
    switch (page) {
      case PageEnumContratos.entidadesContratuais:
        return <pages.EntidadesContratuais />;
      case PageEnumContratos.entidadesEscolares:
        return <pages.EntidadesEscolares />;
      case PageEnumContratos.novoContrato:
        return <pages.NovoContrato />;
      case PageEnumContratos.sobreescreverContrato:
        return <pages.SobreescreverContrato />;
      case PageEnumContratos.editContrato:
        return <pages.EditContrato />;
      case PageEnumContratos.editEntidade:
        return <pages.EditEntidade />;
      case PageEnumContratos.novaEntidade:
        return <pages.NovaEntidade />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesContratos />}</div>;
}
