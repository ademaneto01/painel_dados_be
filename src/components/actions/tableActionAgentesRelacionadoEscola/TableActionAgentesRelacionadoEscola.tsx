import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalAddUser } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}
interface FormData {
  userId: string;
  id_ee: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionAgentesRelacionadoEscola(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const { setUsersUpdated, idEntidadeEscolar } = useGlobalContext();
  const initialFormData: FormData = {
    userId: props.id,
    id_ee: idEntidadeEscolar,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }
  async function deleteUser() {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiMock(`${token}`);
      console.log(formData);
      await backendApi.deletarVinculoAgente(formData);
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setShowModalAddEditSchool(props.id);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalAddEditSchool(props.id)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />
      {showModalAddEditSchool === props.id && (
        <ModalAddUser
          titleModal={'Editar usuário'}
          userId={props.id}
          isEditing={true}
          onCancel={() => setShowModalAddEditSchool('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onConfirm={() => deleteUser()}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
