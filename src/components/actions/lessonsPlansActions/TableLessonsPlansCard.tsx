import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalLessons } from '../../modal';
import { useState } from 'react';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
  color?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.1em';
  options.color = color;

  return icon(options);
}

export default function TableLessonsPlansCard(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalEdit, setShowModalEdit] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }
  function handleClickOpenModalEdit(id: string): void {
    setShowModalEdit(props.id);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit, 'var(--gray-300)')}
        onClick={() => handleClickOpenModalEdit(props.id)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

      {showModalEdit === props.id && (
        <ModalLessons
          data-testid="ModalLessons"
          modalKey={props.id}
          onClose={() => setShowModalEdit('')}
        />
      )}
      {showModalDelete === props.id && (
        <ModalDelete
          data-testid="ModalDelete"
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDelete}?`}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
