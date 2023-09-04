import { useGlobalContext } from '@/context/store';
import pages from '../../pages/ContratoModule/index';
import { PageEnumContratos } from '@/enums';
import styles from '@/styles/CardLessons.module.css';
import { useState } from 'react';

export default function SwitchCaseContratos() {
  const { page, setPage } = useGlobalContext();
  const [idContrato, setIdContrato] = useState('');
  function PagesContratos(): JSX.Element {
    switch (page) {
      case PageEnumContratos.entidadesContratuais:
        return (
          <pages.EntidadesContratuais
            setIdContrato={setIdContrato}
            setPage={setPage}
          />
        );
      case PageEnumContratos.entidadesEscolares:
        return (
          <pages.EntidadesEscolares
            setIdContrato={setIdContrato}
            setPage={setPage}
            idContrato={idContrato}
          />
        );
      case PageEnumContratos.novoContrato:
        return (
          <pages.NovoContrato setIdContrato={setIdContrato} setPage={setPage} />
        );
      case PageEnumContratos.sobreescreverContrato:
        return (
          <pages.SobreescreverContrato
            setIdContrato={setIdContrato}
            setPage={setPage}
          />
        );
      case PageEnumContratos.editContrato:
        return <pages.EditContrato />;
      case PageEnumContratos.editEntidade:
        return <pages.EditEntidade />;
      case PageEnumContratos.novaEntidade:
        return (
          <pages.NovaEntidade
            setIdContrato={setIdContrato}
            idContrato={idContrato}
            setPage={setPage}
          />
        );
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesContratos />}</div>;
}
