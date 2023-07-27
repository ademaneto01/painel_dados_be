import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalAddUser } from '../../modal';
import { useState } from 'react';

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

export default function TableActionsUsers(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
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
          userId={props.id}
          onCancel={() => setShowModalAddEditSchool('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
