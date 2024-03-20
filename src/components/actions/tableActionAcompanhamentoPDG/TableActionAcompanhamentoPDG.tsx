import styles from '@/styles/Action.module.css';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImEyePlus } from 'react-icons/im';
import { IconBaseProps, IconType } from 'react-icons';
import { MdOutlineFileDownload } from 'react-icons/md';
import { ModalDelete, ModalDadosContrato } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete, BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import Action from '../Action';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import { printDocument } from '@/pdfGenerate';
import {
  EntitiesAcompanhamentoPDG,
  EntitiesAcompanhamentoPDGCriteria,
} from '@/entities';
import Tooltip from '@/components/Tooltip/Tooltip';
import { ComponentInfos, ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils/HandleApiErrors';

interface PropsForFxclusion {
  id: string;
  nome?: string;
  finalized?: boolean;
}

interface DataInterface {
  [key: string]: string;
}

export default function TableActionAcompanhamentoPDG(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const {
    setUsersUpdated,
    setShowPageVisualizeAcompanhamento,
    setPageAcompanhamento,
    setIdAcompanhamento,
  } = useGlobalContext();
  const [modalInfos, setModalInfos] = useState('');
  const handleViewMoreClick = () => verMais();
  const handleEditAcompanhamento = () => EditarAcompanhamento();
  const handleDeleteClick = () => handleClickOpenModalExcluir(props.id);
  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {};

    options.fontSize = '1.3em';
    options.color = color;

    return icon(options);
  }
  async function deleteAcompanhamento(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiDelete(token);

    try {
      await backendApi.deletarAcompanhamento({ id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    }
  }
  function avaliarDesempenho(nota: any) {
    if (nota <= -0.7) {
      return 'A desenvolver';
    } else if (nota > -0.7 && nota <= -0.3) {
      return 'Em desenvolvimento';
    } else if (nota > -0.3 && nota < 0.3) {
      return 'Satisfatório';
    } else if (nota >= 0.3 && nota < 0.7) {
      return 'Desenvolvido';
    } else {
      return 'Plenamente Desenvolvido';
    }
  }
  async function handleFindJsonToPDF(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiGet(token);
    setIsLoadingPdf(true);
    setTimeout(() => {
      setIsLoadingPdf(false);
    }, 5000);
    try {
      const response = await backendApi.localizarAcompanhamentoById(id);
      const responseCriteria = await backendApi.LocalizarCriteriaById(id);

      const dataToPDF: EntitiesAcompanhamentoPDG = response[0];
      const dataCriteria: EntitiesAcompanhamentoPDGCriteria =
        responseCriteria[0];

      const userRealizedAcompanhamento = await backendApi.localizarUsuario(
        dataToPDF.id_user,
      );

      const dataForPrint: DataInterface = {
        nome_escola: dataToPDF.nome_escola,
        nomeAgente: dataToPDF.nome_agente,
        assessor: userRealizedAcompanhamento[0].nome,
        dataofobservation: dataToPDF.dataofobservation,
        grade: dataToPDF.grade,
        ofstudents: dataToPDF.ofstudents,
        tema: dataToPDF.tema,
        lessonplanbe: dataToPDF.lessonplanbe,
        cycle: dataToPDF.cycle,
        digitalprojector: dataToPDF.digitalprojector,
        board: dataToPDF.board,
        englishcorner: dataToPDF.englishcorner,
        noiselevel: dataToPDF.noiselevel,
        resourceaudioqlty: dataToPDF.resourceaudioqlty,
        nglbematerials: dataToPDF.nglbematerials,
        lp1lessonplan: dataToPDF.lp1lessonplan,
        lp2proposedgoals: dataToPDF.lp2proposedgoals,
        lp3resourcesused: dataToPDF.lp3resourcesused,
        lp4changes: dataToPDF.lp4changes,
        finalcoments: dataToPDF.finalcoments,
        E1: avaliarDesempenho(dataCriteria.e1),
        E2: avaliarDesempenho(dataCriteria.e2),
        E3: avaliarDesempenho(dataCriteria.e3),
        E4: avaliarDesempenho(dataCriteria.e4),
        E5: avaliarDesempenho(dataCriteria.e5),
        E6: avaliarDesempenho(dataCriteria.e6),
        M1: avaliarDesempenho(dataCriteria.m1),
        M2: avaliarDesempenho(dataCriteria.m2),
        M3: avaliarDesempenho(dataCriteria.m3),
        M4: avaliarDesempenho(dataCriteria.m4),
        M5: avaliarDesempenho(dataCriteria.m5),
        M6: avaliarDesempenho(dataCriteria.m6),
        L1: avaliarDesempenho(dataCriteria.l1),
        L2: avaliarDesempenho(dataCriteria.l2),
        L3: avaliarDesempenho(dataCriteria.l3),
        L4: avaliarDesempenho(dataCriteria.l4),
        L5: avaliarDesempenho(dataCriteria.l5),
        L6: avaliarDesempenho(dataCriteria.l6),
      };

      await printDocument(dataForPrint);
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    }
  }

  function handleClickOpenModalExcluir(id: string): void {
    setModalInfos('');
    setShowModalDelete(id);
  }

  function verMais(): void {
    setShowPageVisualizeAcompanhamento(props.id);
    setPageAcompanhamento(PageEnumAcompanhamentoPDG.visualizeAcompanhamento);
  }

  function EditarAcompanhamento(): void {
    setIdAcompanhamento(props.id);
    setPageAcompanhamento(PageEnumAcompanhamentoPDG.editarAcompanhamento);
  }

  return (
    <div className={styles.container}>
      {isLoadingPdf && <ComponentInfos message={'Seu PDF está sendo gerado'} />}
      {props.finalized ? (
        <Tooltip text="Download Acompanhamento">
          <Action
            icon={renderIcon(MdOutlineFileDownload)}
            onClick={() => handleFindJsonToPDF(props.id)}
          />
        </Tooltip>
      ) : (
        ''
      )}
      {!props.finalized ? (
        <Tooltip text="Editar Acompanhamento">
          <Action
            icon={renderIcon(FiEdit)}
            onClick={handleEditAcompanhamento}
          />
        </Tooltip>
      ) : (
        ''
      )}
      <Tooltip text="Visualizar Informações">
        <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      </Tooltip>

      <Action
        icon={renderIcon(FaTrashAlt, 'var(--red-300)')}
        onClick={handleDeleteClick}
      />

      {showModalAddEditSchool === props.id && (
        <ModalDadosContrato
          idContrato={props.id}
          onCancel={() => setShowModalAddEditSchool('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onConfirm={() => deleteAcompanhamento(props.id)}
          onCancel={() => setShowModalDelete('')}
        />
      )}
      {error && <ErrorComponent message={msgError} />}
    </div>
  );
}
