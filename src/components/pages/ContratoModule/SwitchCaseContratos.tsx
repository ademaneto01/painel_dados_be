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
      case PageEnumContratos.registrarDoc:
        return <pages.RegistrarDoc />;
      case PageEnumContratos.docsContrato:
        return <pages.DocsContrato />;
      case PageEnumContratos.docsEntidade:
        return <pages.DocsEntidade />;
      case PageEnumContratos.registrarDocEntidade:
        return <pages.RegistrarDocEntidade />;
      case PageEnumContratos.infosContrato:
        return <pages.InfosContrato />;
      case PageEnumContratos.registrarInfosContrato:
        return <pages.RegistrarInfosContrato />;
      case PageEnumContratos.editarInfosContrato:
        return <pages.EditarInfosContrato />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesContratos />}</div>;
}
