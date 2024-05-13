import { useGlobalContext } from '@/context/store';
// import pages from '../../pages/ContratoModule/index';
import dynamic from 'next/dynamic';
import { PageEnumContratos } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

const EntidadesContratuais = dynamic(
  () => import('../ContratoModule/entidadesContratuais/EntidadesContratuais'),
);

const EntidadesEscolares = dynamic(
  () => import('../ContratoModule/entidadesEscolares/EntidadesEscolares'),
);

const NovoContrato = dynamic(
  () => import('../ContratoModule/CRUDcrontratos/NovoContrato'),
);

const SobreescreverContrato = dynamic(
  () => import('../ContratoModule/CRUDcrontratos/SobreescreverContrato'),
);

const EditContrato = dynamic(
  () => import('../ContratoModule/CRUDcrontratos/EditContrato'),
);

const EditEntidade = dynamic(
  () => import('../ContratoModule/CRUDentidades/EditEntidade'),
);

const NovaEntidade = dynamic(
  () => import('../ContratoModule/CRUDentidades/NovaEntidade'),
);

const RegistrarDoc = dynamic(
  () => import('../ContratoModule/registrarDoc/RegistrarDoc'),
);
const DocsContrato = dynamic(
  () => import('../ContratoModule/docsContrato/DocsContrato'),
);

const DocsEntidade = dynamic(
  () => import('../ContratoModule/docsEntidade/DocsEntidade'),
);
const RegistrarDocEntidade = dynamic(
  () => import('../ContratoModule/registrarDocEntidade/RegistrarDocEntidade'),
);
const InfosContrato = dynamic(
  () => import('../ContratoModule/infosContrato/InfosContrato'),
);
const RegistrarInfosContrato = dynamic(
  () => import('../ContratoModule/infosContrato/RegistrarInfosContrato'),
);
const EditarInfosContrato = dynamic(
  () => import('../ContratoModule/infosContrato/EditarInfosContrato'),
);
const Alunados = dynamic(() => import('../ContratoModule/alunados/Alunados'));
const CadastrarAlunado = dynamic(
  () =>
    import(
      '../ContratoModule/alunados/CRUDAlunado/cadastroAlunado/CadastroAlunado'
    ),
);
const EditarAlunado = dynamic(
  () =>
    import(
      '../ContratoModule/alunados/CRUDAlunado/editarAlunado/EditarAlunado'
    ),
);
export default function SwitchCaseContratos() {
  const { page } = useGlobalContext();

  function PagesContratos(): JSX.Element {
    switch (page) {
      case PageEnumContratos.entidadesContratuais:
        return <EntidadesContratuais />;
      case PageEnumContratos.entidadesEscolares:
        return <EntidadesEscolares />;
      case PageEnumContratos.novoContrato:
        return <NovoContrato />;
      case PageEnumContratos.sobreescreverContrato:
        return <SobreescreverContrato />;
      case PageEnumContratos.editContrato:
        return <EditContrato />;
      case PageEnumContratos.editEntidade:
        return <EditEntidade />;
      case PageEnumContratos.novaEntidade:
        return <NovaEntidade />;
      case PageEnumContratos.registrarDoc:
        return <RegistrarDoc />;
      case PageEnumContratos.docsContrato:
        return <DocsContrato />;
      case PageEnumContratos.docsEntidade:
        return <DocsEntidade />;
      case PageEnumContratos.registrarDocEntidade:
        return <RegistrarDocEntidade />;
      case PageEnumContratos.infosContrato:
        return <InfosContrato />;
      case PageEnumContratos.registrarInfosContrato:
        return <RegistrarInfosContrato />;
      case PageEnumContratos.editarInfosContrato:
        return <EditarInfosContrato />;
      case PageEnumContratos.alunados:
        return <Alunados />;
      case PageEnumContratos.cadastroAlunado:
        return <CadastrarAlunado />;
      case PageEnumContratos.editarAlunado:
        return <EditarAlunado />;

      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesContratos />}</div>;
}
