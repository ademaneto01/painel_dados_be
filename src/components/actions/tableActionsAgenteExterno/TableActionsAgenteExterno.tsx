import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDadosAgente, ModalDelete } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumAgentesExterno } from '@/enums';
import { ImEyePlus } from 'react-icons/im';

interface PropsForFxclusion {
  uuid_agente: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsAgenteExterno(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalVermais, setShowModalVermais] = useState('');
  const { setUsersUpdated, setIdAgente, setPageAgentesExterno } =
    useGlobalContext();

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.uuid_agente);
  }
  async function deleteUser() {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiDelete(`${token}`);
      await backendApi.deletarAgente({ userId: props.uuid_agente });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleViewMoreClick = () => verMais(props.uuid_agente);

  function handleClickOpenEditAgente(id: string): void {
    setIdAgente(props.uuid_agente);
    console.log('ok');
    setPageAgentesExterno(PageEnumAgentesExterno.editarAgente);
  }

  function verMais(uuid_agente: string): void {
    setShowModalVermais(uuid_agente);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenEditAgente(props.uuid_agente)}
      />
      <Action icon={reactIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.uuid_agente)}
      />

      {showModalVermais === props.uuid_agente && (
        <ModalDadosAgente
          uuid_agente={props.uuid_agente}
          onCancel={() => setShowModalVermais('')}
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
