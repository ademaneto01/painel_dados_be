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
import ModalEditarVinculoAgente from '@/components/modal/modalEditarVinculoAgente/ModalEditarVinculoAgente';

interface PropsForFxclusion {
  uuid_agente: string;
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
  const [showModalEditAgente, setShowModalEditAgente] = useState('');
  const { setUsersUpdated, idEntidadeEscolar } = useGlobalContext();
  const initialFormData: FormData = {
    userId: props.uuid_agente,
    id_ee: idEntidadeEscolar,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.uuid_agente);
  }
  async function deleteUser() {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiMock(`${token}`);
      await backendApi.deletarVinculoAgente(formData);
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickOpenModalEditAgente(id: string): void {
    setShowModalEditAgente(props.uuid_agente);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalEditAgente(props.uuid_agente)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.uuid_agente)}
      />
      {showModalEditAgente === props.uuid_agente && (
        <ModalEditarVinculoAgente
          userId={props.uuid_agente}
          onCancel={() => setShowModalEditAgente('')}
        />
      )}

      {showModalDelete === props.uuid_agente && (
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
