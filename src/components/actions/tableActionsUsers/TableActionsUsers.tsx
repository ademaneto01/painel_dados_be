import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalEditUser } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import Tooltip from '@/components/Tooltip/Tooltip';

interface PropsForExclusion {
  id: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsUsers(
  props: PropsForExclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalEditUser, setShowModalEditUser] = useState(''); // State for the edit user modal
  const { setUsersUpdated } = useGlobalContext();

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  async function deleteUser(id: string) {
    // Your delete user logic here
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiDelete(`${token}`);

      await backendApi.deletarUsuario({ userId: id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickOpenModalAddEditUser(id: string): void {
    setShowModalEditUser(props.id);
  }

  return (
    <div className={styles.container}>
    <Tooltip text="Editar Usuário"> 
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalAddEditUser(props.id)}
      />
    </Tooltip>
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />
      {showModalEditUser === props.id && (
        <ModalEditUser
          titleModal={'Editar usuário'}
          userId={props.id}
          onCancel={() => setShowModalEditUser('')}
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
