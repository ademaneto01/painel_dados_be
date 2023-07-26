import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalAddEditTeachers, ModalDelete } from '../../modal';
import { useState } from 'react';

interface PropsForFxclusion {
  id: string;
  titleDeleteTeachers?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.1em';
  options.color = color;

  return icon(options);
}

export default function TableTeacherGuidesCard(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDeleteTeachers, setShowModalDeleteTeachers] = useState('');
  const [showModalEditTeachers, setShowModalEditTeachers] = useState('');

  function handleClickOpenModalExcluirTeachers(id: string): void {
    setShowModalDeleteTeachers(props.id);
  }
  function handleClickOpenModalEditTeachers(id: string): void {
    setShowModalEditTeachers(props.id);
  }
  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit, 'var(--gray-300)')}
        onClick={() => handleClickOpenModalEditTeachers(props.id)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluirTeachers(props.id)}
      />

      {showModalEditTeachers === props.id && (
        <ModalAddEditTeachers
          modalKey={props.id}
          onClose={() => setShowModalEditTeachers('')}
        />
      )}
      {showModalDeleteTeachers === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDeleteTeachers}?`}
          onCancel={() => setShowModalDeleteTeachers('')}
        />
      )}
    </div>
  );
}
