import styles from '@/styles/Action.module.css';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImEyePlus } from 'react-icons/im';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosContrato } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumContratos } from '@/enums';
import Action from '../Action';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}

export default function TableActionsContratos(
  props: PropsForFxclusion,
): JSX.Element {
  const [actionPosition, setActionPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddDoc, setShowModalAddDoc] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const { setUsersUpdated, setIdContrato, setPage } = useGlobalContext();
  const [modalInfos, setModalInfos] = useState('');

  const handleEditClick = () => handleClickOpenModalAddEditSchool(props.id);
  const handleOverwriteClick = () =>
    handleClickOpenModalSobreescreContrato(props.id);
  const handleViewMoreClick = () => verMais(props.id);
  const handleInfosContratoClick = () => InfosContrato(props.id);
  const handleDeleteClick = () => handleClickOpenModalExcluir(props.id);
  const handleVisualizarDocs = () => visualizarDocs(props.id);
  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {};

    options.fontSize = '1.3em';
    options.color = color;

    return icon(options);
  }
  async function deleteUser(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiMock(token);

    try {
      await backendApi.deletarContrato({ uuid_ec: id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalInfos = (id: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setActionPosition({ x: rect.left, y: rect.bottom + scrollTop });
    setModalInfos(id);
  };

  function handleClickOpenModalExcluir(id: string): void {
    setModalInfos('');
    setShowModalDelete(id);
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdContrato(id);
    setModalInfos('');
    setPage(PageEnumContratos.editContrato);
  }
  function InfosContrato(id: string): void {
    setIdContrato(props.id);
    setModalInfos('');
    setPage(PageEnumContratos.infosContrato);
  }
  function handleClickOpenModalSobreescreContrato(id: string): void {
    setIdContrato(id);
    setPage(PageEnumContratos.sobreescreverContrato);
  }
  function visualizarDocs(id: string): void {
    setIdContrato(id);
    setModalInfos('');
    setPage(PageEnumContratos.docsContrato);
  }
  function verMais(id: string): void {
    setModalInfos('');
    setShowModalAddEditSchool(id);
  }

  return (
    <div className={styles.container}>
      <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      <Action
        icon={renderIcon(FaTrashAlt, 'var(--red-300)')}
        onClick={handleDeleteClick}
      />
      <Action
        icon={
          modalInfos ? renderIcon(FiMoreVertical) : renderIcon(FiMoreHorizontal)
        }
        onClick={(event) => {
          handleModalInfos(props.id, event);
        }}
      />

      {modalInfos === props.id && (
        <div
          className={styles.fullScreenDiv}
          onClick={() => {
            setModalInfos('');
          }}
        >
          <div
            className={styles.modalWrapper}
            style={{
              left: actionPosition?.x,
              top: actionPosition?.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal}>
              <button onClick={handleEditClick}>Editar Contrato</button>
              <button onClick={handleOverwriteClick}>
                Sobreescrever Contrato
              </button>
              <button onClick={handleInfosContratoClick}>Infos Contrato</button>
              <button onClick={handleVisualizarDocs}>
                Visualizar Documentos
              </button>
            </div>
          </div>
        </div>
      )}

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
          onConfirm={() => deleteUser(props.id)}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
