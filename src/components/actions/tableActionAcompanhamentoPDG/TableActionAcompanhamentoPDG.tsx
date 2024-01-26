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
import { EntitiesAcompanhamentoPDG } from '@/entities';
import Tooltip from '@/components/Tooltip/Tooltip';

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

  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const {
    setUsersUpdated,
    setShowPageVisualizeAcompanhamento,
    setPageAcompanhamento,
    setIsLoading,
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
    } catch (error) {
      console.log(error);
    } finally {
      setUsersUpdated(false);
    }
  }
  async function handleFindJsonToPDF(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiGet(token);
    setIsLoading(true);

    try {
      const response = await backendApi.localizarAcompanhamentoById(id);
      const dataToPDF: EntitiesAcompanhamentoPDG = response[0];
      const dataForPrint: DataInterface = {
        nome_escola: dataToPDF.nome_escola,
        nomeAgente: dataToPDF.nome_agente,
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
      };
      await printDocument(dataForPrint);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    </div>
  );
}
