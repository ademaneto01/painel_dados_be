import styles from '@/styles/Action.module.css';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosEntidadeEscolar } from '../../modal';
import { ImEyePlus } from 'react-icons/im';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumContratos } from '@/enums';
import Action from '../Action';
import Tooltip from '@/components/Tooltip/Tooltip';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}

export default function TableActionEntidadeEscolar(
  props: PropsForFxclusion,
): JSX.Element {
  const [actionPosition, setActionPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [modalInfos, setModalInfos] = useState('');
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalVermais, setShowModalVermais] = useState('');
  const {
    setContractOrEntidadeUpdated,
    setIdContrato,
    setIdEntidadeEscolar,
    setPage,
  } = useGlobalContext();

  const handleEditClick = () => handleClickOpenModalAddEditSchool(props.id);
  const handleAlunadosClick = () => handleClickOpenPageAlunados(props.id);
  const handleViewMoreClick = () => verMais(props.id);
  const handleDeleteClick = () => handleClickOpenModalExcluir(props.id);
  const handleVisualizarDocClick = () => visualizarDocumentos(props.id);
  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.3em',
      color: color,
    };

    return icon(options);
  }

  async function deleteEntidadeEscolar(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiDelete(`${token}`);
    try {
      await backendApi.deletarEntidadeEscolar({ id });
      setShowModalDelete('');
      setContractOrEntidadeUpdated(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleModalInfos = (id: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setActionPosition({ x: rect.left, y: rect.bottom + scrollTop });
    setModalInfos(id);
  };

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(id);
    setModalInfos('');
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdEntidadeEscolar(id);
    setPage(PageEnumContratos.editEntidade);
  }
  function handleClickOpenPageAlunados(id: string): void {
    setIdEntidadeEscolar(id);
    setPage(PageEnumContratos.alunados);
  }

  function visualizarDocumentos(id: string): void {
    setIdEntidadeEscolar(id);
    setPage(PageEnumContratos.docsEntidade);
  }
  function verMais(id: string): void {
    setShowModalVermais(id);
    setModalInfos('');
  }

  return (
    <div className={styles.container}>
      <Action
        icon={
          modalInfos ? renderIcon(FiMoreVertical) : renderIcon(FiMoreHorizontal)
        }
        onClick={(event) => {
          handleModalInfos(props.id, event);
        }}
      />
      <Tooltip text="Visualizar Informações">
        <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      </Tooltip>
      <Action
        icon={renderIcon(FaTrashAlt, '#f1646c')}
        onClick={handleDeleteClick}
      />

      {modalInfos === props.id && (
        <div className={styles.fullScreenDiv} onClick={() => setModalInfos('')}>
          <div
            className={styles.modalWrapper}
            style={{
              left: actionPosition?.x,
              top: actionPosition?.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal}>
              <button onClick={handleEditClick}>Editar Entidade</button>
              <button onClick={handleAlunadosClick}>Alunado</button>
              <button onClick={handleVisualizarDocClick}>
                Visualizar Documentos
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalVermais === props.id && (
        <ModalDadosEntidadeEscolar
          idEntidade={props.id}
          onCancel={() => setShowModalVermais('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onConfirm={() => deleteEntidadeEscolar(props.id)}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
