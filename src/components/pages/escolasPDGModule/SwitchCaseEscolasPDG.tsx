import { useGlobalContext } from '@/context/store';
import dynamic from 'next/dynamic';
import { PageEnumEscolasPDG } from '@/enums';
import styles from '@/styles/CardLessons.module.css';

const EscolasPDG = dynamic(
  () => import('../escolasPDGModule/escolasPDG/EscolasPDG'),
);
const RegistrarDocEntidadePDG = dynamic(
  () =>
    import(
      '../escolasPDGModule/regitrarDocEntidadePDG/RegistrarDocEntidadePDG'
    ),
);
const DocsEscola = dynamic(
  () => import('../escolasPDGModule/docsEscola/DoscEscola'),
);
const ProfessoresEscola = dynamic(
  () => import('../escolasPDGModule/professoresEscola/ProfessoresEscola'),
);
const AlunadosPDG = dynamic(
  () => import('../escolasPDGModule/alunadosPDG/AlunadosPDG'),
);
const CadastrarAlunadoPDG = dynamic(
  () =>
    import(
      '../escolasPDGModule/alunadosPDG/CRUDAlunadoPDG/cadastroAlunadoPDG/CadastroAlunadoPDG'
    ),
);
const EditarAlunadoPDG = dynamic(
  () =>
    import(
      '../escolasPDGModule/alunadosPDG/CRUDAlunadoPDG/editarAlunadoPDG/EditarAlunadoPDG'
    ),
);
const RegistrarOcorrenciaPDG = dynamic(
  () =>
    import(
      '../escolasPDGModule/ocorrenciasPDG/CRUDOcorrenciasPDG/RegistrarOcorrenciaPDG'
    ),
);

export default function SwitchCaseEscolasPDG() {
  const { pageEscolasPDG } = useGlobalContext();

  function PagesEscolasPDG(): JSX.Element {
    switch (pageEscolasPDG) {
      case PageEnumEscolasPDG.escolasPDG:
        return <EscolasPDG />;
      case PageEnumEscolasPDG.registrarDocEntidadePDG:
        return <RegistrarDocEntidadePDG />;
      case PageEnumEscolasPDG.docsEscola:
        return <DocsEscola />;
      case PageEnumEscolasPDG.professoresEscola:
        return <ProfessoresEscola />;
      case PageEnumEscolasPDG.alunadosPDG:
        return <AlunadosPDG />;
      case PageEnumEscolasPDG.cadastroAlunadoPDG:
        return <CadastrarAlunadoPDG />;
      case PageEnumEscolasPDG.editarAlunadoPDG:
        return <EditarAlunadoPDG />;
      case PageEnumEscolasPDG.RegistrarOcorrenciaPDG:
        return <RegistrarOcorrenciaPDG />;

      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PagesEscolasPDG />}</div>;
}
