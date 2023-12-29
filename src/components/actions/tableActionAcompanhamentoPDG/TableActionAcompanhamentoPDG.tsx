import styles from '@/styles/Action.module.css';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImEyePlus } from 'react-icons/im';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosContrato } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import Action from '../Action';
import { PageEnumAcompanhamentoPDG } from '@/enums';

interface PropsForFxclusion {
  id: string;
  nome?: string;
  finalized?: boolean;
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
        <Action icon={renderIcon(FiEdit)} onClick={handleEditAcompanhamento} />
      ) : (
        ''
      )}

      <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
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
