import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImEyePlus } from 'react-icons/im';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosContrato } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumContratos } from '@/enums';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}

export default function TableActionsContratos(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const { setUsersUpdated, setIdContrato, setPage } = useGlobalContext();

  const handleEditClick = () => handleClickOpenModalAddEditSchool(props.id);
  const handleOverwriteClick = () =>
    handleClickOpenModalSobreescreContrato(props.id);
  const handleViewMoreClick = () => verMais(props.id);
  const handleDeleteClick = () => handleClickOpenModalExcluir(props.id);

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

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(id);
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdContrato(id);
    setPage(PageEnumContratos.editContrato);
  }

  function handleClickOpenModalSobreescreContrato(id: string): void {
    setIdContrato(id);
    setPage(PageEnumContratos.sobreescreverContrato);
  }

  function verMais(id: string): void {
    setShowModalAddEditSchool(id);
  }

  return (
    <div className={styles.container}>
      <Action icon={renderIcon(FiEdit)} onClick={handleEditClick} />
      <Action
        icon={renderIcon(FiEdit, '#f1646c')}
        onClick={handleOverwriteClick}
      />
      <Action icon={renderIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      <Action
        icon={renderIcon(FaTrashAlt, '#f1646c')}
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
          onConfirm={() => deleteUser(props.id)}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
