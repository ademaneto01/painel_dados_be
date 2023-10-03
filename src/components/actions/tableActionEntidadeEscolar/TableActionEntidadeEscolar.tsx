import styles from '@/styles/Action.module.css';
import { FiEdit, FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosEntidadeEscolar } from '../../modal';
import { ImEyePlus } from 'react-icons/im';
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
  const { setUsersUpdated, setIdContrato, setIdEntidadeEscolar, setPage } =
    useGlobalContext();

  const handleEditClick = () => handleClickOpenModalAddEditSchool(props.id);
  const handleViewMoreClick = () => verMais(props.id);
  const handleDeleteClick = () => handleClickOpenModalExcluir(props.id);

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.3em',
      color: color,
    };

    return icon(options);
  }

  async function deleteEntidadeEscolar(id: string) {
    const token = Cookies.get('auth_token');
    const backendApi = new BackendApiMock(`${token}`);
    try {
      await backendApi.deletarEntidadeEscolar({ id });
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
    setShowModalDelete(id);
    setModalInfos('');
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdEntidadeEscolar(id);
    setPage(PageEnumContratos.editEntidade);
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
              <button onClick={handleViewMoreClick}>Ver Mais</button>
              <button onClick={handleDeleteClick}>Deletar Entidade</button>
            </div>
          </div>
        </div>
      )}

      {/* <Action icon={renderIcon(FiEdit)} onClick={handleEditClick} />
      <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      <Action
        icon={renderIcon(FaTrashAlt, '#f1646c')}
        onClick={handleDeleteClick}
      /> */}

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
