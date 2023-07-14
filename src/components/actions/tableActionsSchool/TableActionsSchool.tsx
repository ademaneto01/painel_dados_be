'use client';

import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { useGlobalContext } from '@/context/store';
import { ModalDelete, ModalAddEditSchool } from '../../modal';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsSchool(
  props: PropsForFxclusion,
): JSX.Element {
  const {
    showModalDelete,
    setShowModalDelete,
    showModalAddEditSchool,
    setShowModalAddEditSchool,
  } = useGlobalContext();

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
        <ModalAddEditSchool
          onCancel={() => setShowModalAddEditSchool('')}
          modalKey={props.id}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDelete} ?`}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
