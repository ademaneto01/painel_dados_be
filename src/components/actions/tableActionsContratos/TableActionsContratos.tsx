import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { ImEyePlus } from 'react-icons/im';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalAddUser, ModalDadosContrato } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumContratos } from '@/enums';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsContratos(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const { setUsersUpdated, setIdContrato, setPage } = useGlobalContext();
  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  async function deleteUser(id: string) {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.deleteContract({ id_contrato: props.id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdContrato(props.id);
    setPage(PageEnumContratos.editContrato);
  }
  function handleClickOpenModalSobreescreContrato(id: string): void {
    setIdContrato(props.id);
    setPage(PageEnumContratos.sobreescreverContrato);
  }

  function verMais(id: string): void {
    setShowModalAddEditSchool(id);
  }
  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => {
          handleClickOpenModalAddEditSchool(props.id);
        }}
      />
      <Action
        icon={reactIcon(FiEdit, '#f1646c')}
        onClick={() => {
          handleClickOpenModalSobreescreContrato(props.id);
        }}
      />
      <Action
        icon={reactIcon(ImEyePlus)}
        onClick={() => {
          verMais(props.id);
        }}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
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
