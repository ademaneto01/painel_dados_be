'use client';

import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalAddEditClassPlan } from '../../modal';
import { useState } from 'react';

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

export default function TableActionsClassPlan(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalAddEditClassPlan, setShowModalAddEditClassPlan] =
    useState('');
  const [showModalDelete, setShowModalDelete] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  function handleClickOpenModalClassPlan(id: string): void {
    setShowModalAddEditClassPlan(props.id);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalClassPlan(props.id)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

      {showModalAddEditClassPlan === props.id && (
        <ModalAddEditClassPlan
          onCancel={() => setShowModalAddEditClassPlan('')}
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
