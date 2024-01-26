import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete } from '../../modal';
import { ModalVisualizarDoc } from '../../modal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BackendApiDelete } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ImEyePlus } from 'react-icons/im';
import Tooltip from '@/components/Tooltip/Tooltip';

interface PropsForFxclusion {
  id: string;
  url_doc: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsDocsContrato(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalDoc, setShowModalDoc] = useState('');
  const { setUsersUpdated } = useGlobalContext();

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }
  async function deleteDoc() {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiDelete(`${token}`);
      await backendApi.deletarDocContrato({ id: props.id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setUsersUpdated(false);
    }
  }

  const handleViewMoreClick = () => verMais(props.url_doc);

  function verMais(url_doc: string): void {
    setShowModalDoc(props.id);
  }

  return (
    <div className={styles.container}>
      <Tooltip text="Visualizar Documento">
        <Action icon={reactIcon(ImEyePlus)} onClick={handleViewMoreClick} />
      </Tooltip>
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

      {showModalDoc === props.id && (
        <ModalVisualizarDoc
          url_doc={props.url_doc}
          onCancel={() => setShowModalDoc('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onConfirm={() => deleteDoc()}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
